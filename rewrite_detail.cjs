const fs = require('fs');
const content = fs.readFileSync('c:/Users/User/Downloads/educonnect/frontend/src/pages/QuestionDetailPage.jsx', 'utf8');

let newContent = content.replace(
  /\{(\/\* Question Vote Controls \*\/[\s\S]*?)\}/, 
  ''
);

// We need to inject the Quora style Action bar below the Question tags
const oldQuestionContent =           {/* Content */};
const actionString = 
          {/* Content */}
;

fs.writeFileSync('c:/Users/User/Downloads/educonnect/frontend/src/pages/QuestionDetailPage.jsx.tmp', newContent);
