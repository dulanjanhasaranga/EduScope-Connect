const fs = require('fs');
const content = fs.readFileSync('C:\\\\Users\\\\User\\\\.gemini\\\\antigravity-ide\\\\brain\\\\4f7f7227-f910-46d4-8c6f-88b425a4251f\\\\.system_generated\\\\logs\\\\transcript_full.jsonl', 'utf8');
for (const line of content.split('\n')) {
    if (line.includes('247 problems')) {
        console.log(line.substring(0, 1500));
        break;
    }
}
