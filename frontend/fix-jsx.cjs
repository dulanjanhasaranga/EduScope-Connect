const fs = require('fs');
const path = require('path');

const srcDir = path.join('C:\\Users\\User\\Downloads\\educonnect\\frontend', 'src');

const lucideIcons = [
    'UserPlus', 'Linkedin', 'Facebook', 'Youtube', 'MapPin', 'Phone', 'Mail',
    'Sparkles', 'Bell', 'Menu', 'ExternalLink', 'XCircle', 'Info', 'Users',
    'Package', 'Shield', 'Edit', 'KeyRound', 'TrendingUp', 'Trophy', 'Medal'
];

function processDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            // Check for Outlet
            if (content.includes('<Outlet />') && !content.includes('Outlet')) {
                // Technically it could include Outlet in another way, but let's safely add it
                if (!/import.*\\bOutlet\\b/.test(content)) {
                    content = 'import { Outlet } from "react-router-dom";\\n' + content;
                    modified = true;
                }
            }
            
            let missingIcons = [];
            lucideIcons.forEach(icon => {
                const tagRegex = new RegExp(\<\\b\\\b\);
                if (tagRegex.test(content) && !content.includes(icon)) {
                    // Wait, if it tests for <Icon, and it doesn't include it?
                    // if it doesn't include it in an import, we just add it
                    missingIcons.push(icon);
                } else if (tagRegex.test(content)) {
                    // Check if it's imported
                    const importRegex = new RegExp(\import.*\\b\\\b.*lucide-react\);
                    if (!importRegex.test(content)) {
                        missingIcons.push(icon);
                    }
                }
            });
            
            if (missingIcons.length > 0) {
                content = \import { \ } from "lucide-react";\\n\ + content;
                modified = true;
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log("Fixed missing JSX elements in " + path.basename(fullPath));
            }
        }
    });
}

processDirectory(srcDir);
