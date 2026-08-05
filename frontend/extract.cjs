const fs = require('fs');
const content = fs.readFileSync('C:\\\\Users\\\\User\\\\.gemini\\\\antigravity-ide\\\\brain\\\\4f7f7227-f910-46d4-8c6f-88b425a4251f\\\\.system_generated\\\\logs\\\\transcript_full.jsonl', 'utf8');
let eslintOutput = '';
for (const line of content.split('\n')) {
    if (line.includes('247 problems')) {
        eslintOutput = line;
        break;
    }
}
const match = eslintOutput.match(/\"output\":\"(.*?)(?=\"\}|$)/);
if (match) {
    const text = match[1].replace(/\\n/g, '\n').replace(/\\\\/g, '\\\\');
    const files = {};
    let currentFile = null;
    for (const line of text.split('\n')) {
        if (line.startsWith('C:\\\\Users\\\\User\\\\Downloads\\\\educonnect\\\\frontend\\\\src')) {
            currentFile = line.trim();
            files[currentFile] = [];
        } else if (currentFile && line.includes('is defined but never used') && line.includes('no-unused-vars')) {
            const varMatch = line.match(/'([^']+)' is defined/);
            if (varMatch) files[currentFile].push(varMatch[1]);
        }
    }
    fs.writeFileSync('missing.json', JSON.stringify(files, null, 2));
    console.log('Extracted to missing.json');
} else {
    console.log('No match found for output');
}
