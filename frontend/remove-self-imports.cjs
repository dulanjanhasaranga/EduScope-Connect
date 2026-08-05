const fs = require('fs');
const path = require('path');

const srcDir = path.join('C:\\Users\\User\\Downloads\\educonnect\\frontend', 'src');

function processDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const basename = path.basename(fullPath, '.jsx');
            
            // Regex to find an import of the same name.
            // Example: import AuthPrompt from "./components/AuthPrompt"; inside AuthPrompt.jsx
            // or import { AuthProvider } from "./context/AuthContext"; inside AuthContext.jsx
            
            let lines = content.split('\n');
            let newLines = lines.filter(line => {
                if (line.startsWith('import ') && line.includes(basename)) {
                    // if it imports exactly the component we are in
                    const regex1 = new RegExp(\import \\\\{? \\\\b\\\\\b \\\\}? from\);
                    const regex2 = new RegExp(\import \\\\b\\\\\b from\);
                    if (regex1.test(line) || regex2.test(line)) {
                        return false;
                    }
                }
                return true;
            });
            
            fs.writeFileSync(fullPath, newLines.join('\n'));
        }
    });
}

processDirectory(srcDir);
console.log("Removed self imports");
