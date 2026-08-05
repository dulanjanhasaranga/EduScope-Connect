const fs = require('fs');
let code = fs.readFileSync('c:/Users/User/Downloads/educonnect/frontend/src/pages/AdminDashboard.jsx', 'utf8');

// Header Icon
code = code.replace('bg-red-100 rounded-xl text-red-600', 'bg-slate-800 rounded-xl text-white');

// Badges
code = code.replace('bg-red-100 text-red-700', 'bg-slate-800 text-white');
code = code.replace('bg-blue-100 text-blue-700', 'bg-slate-100 text-slate-700 border border-slate-200');

// Action Buttons
code = code.replace(/text-yellow-600 hover:bg-yellow-50/g, 'text-slate-400 hover:text-slate-800 hover:bg-slate-100');
code = code.replace(/text-red-600 hover:bg-red-50/g, 'text-slate-400 hover:text-red-600 hover:bg-red-50');
code = code.replace(/text-blue-600 hover:bg-blue-50/g, 'text-slate-400 hover:text-slate-800 hover:bg-slate-100');

// Add Product button
code = code.replace('btn-primary flex items-center gap-2', 'px-4 py-2 bg-slate-900 text-white rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors');

// Save Product button
code = code.replace('bg-primary-600 text-white rounded flex items-center gap-2 hover:bg-primary-700', 'bg-slate-900 text-white rounded flex items-center gap-2 hover:bg-slate-800 transition-colors');

fs.writeFileSync('c:/Users/User/Downloads/educonnect/frontend/src/pages/AdminDashboard.jsx', code);
