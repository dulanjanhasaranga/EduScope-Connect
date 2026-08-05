const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const dictionary = {
    'React': 'import React from \'react\';',
    'useState': 'import { useState } from \'react\';',
    'useEffect': 'import { useEffect } from \'react\';',
    'useContext': 'import { useContext } from \'react\';',
    'useCallback': 'import { useCallback } from \'react\';',
    'useMemo': 'import { useMemo } from \'react\';',
    'useRef': 'import { useRef } from \'react\';',
    'BrowserRouter': 'import { BrowserRouter } from \'react-router-dom\';',
    'Routes': 'import { Routes } from \'react-router-dom\';',
    'Route': 'import { Route } from \'react-router-dom\';',
    'Navigate': 'import { Navigate } from \'react-router-dom\';',
    'Link': 'import { Link } from \'react-router-dom\';',
    'useNavigate': 'import { useNavigate } from \'react-router-dom\';',
    'useLocation': 'import { useLocation } from \'react-router-dom\';',
    'useParams': 'import { useParams } from \'react-router-dom\';',
    'motion': 'import { motion } from \'framer-motion\';',
    'AnimatePresence': 'import { AnimatePresence } from \'framer-motion\';',
    'SimpleMdeReact': 'import SimpleMdeReact from \'react-simplemde-editor\';',
    'ReactMarkdown': 'import ReactMarkdown from \'react-markdown\';',
    
    // Contexts
    'AuthProvider': 'import { AuthProvider } from \'./context/AuthContext\';',
    'useAuth': 'import { useAuth } from \'./context/AuthContext\';',
    'WebSocketProvider': 'import { WebSocketProvider } from \'./context/WebSocketContext\';',
    'useWebSocket': 'import { useWebSocket } from \'./context/WebSocketContext\';',

    // Components
    'Layout': 'import Layout from \'./components/Layout\';',
    'LoadingSpinner': 'import LoadingSpinner from \'./components/LoadingSpinner\';',
    'QuestionCard': 'import QuestionCard from \'./components/QuestionCard\';',
    'AuthPrompt': 'import AuthPrompt from \'./components/AuthPrompt\';',
    'SearchResourcesPanel': 'import SearchResourcesPanel from \'./components/SearchResourcesPanel\';',
    'ToastContainer': 'import { ToastContainer, showToast } from \'./components/ToastContainer\';',
    'TagInput': 'import TagInput from \'./components/TagInput\';',
    'Footer': 'import Footer from \'./components/Footer\';',
    'Navbar': 'import Navbar from \'./components/Navbar\';',
    'WaitlistModal': 'import WaitlistModal from \'./components/WaitlistModal\';',
    'ProductModal': 'import ProductModal from \'./components/ProductModal\';',
    'AnimatedNumber': 'import AnimatedNumber from \'./components/AnimatedNumber\';',

    // Pages
    'LandingPage': 'import LandingPage from \'./pages/LandingPage\';',
    'LoginPage': 'import LoginPage from \'./pages/LoginPage\';',
    'RegisterPage': 'import RegisterPage from \'./pages/RegisterPage\';',
    'ForgotPasswordPage': 'import ForgotPasswordPage from \'./pages/ForgotPasswordPage\';',
    'ResetPasswordPage': 'import ResetPasswordPage from \'./pages/ResetPasswordPage\';',
    'QuestionsPage': 'import QuestionsPage from \'./pages/QuestionsPage\';',
    'QuestionDetailPage': 'import QuestionDetailPage from \'./pages/QuestionDetailPage\';',
    'AskQuestionPage': 'import AskQuestionPage from \'./pages/AskQuestionPage\';',
    'ProfilePage': 'import ProfilePage from \'./pages/ProfilePage\';',
    'AdminDashboard': 'import AdminDashboard from \'./pages/AdminDashboard\';',
    'LeaderboardPage': 'import LeaderboardPage from \'./pages/LeaderboardPage\';',
    'GoogleSearchPage': 'import GoogleSearchPage from \'./pages/GoogleSearchPage\';',
    'EcosystemPage': 'import EcosystemPage from \'./pages/EcosystemPage\';',
    
    // Lucide Icons
    'BookOpen': 'import { BookOpen } from \'lucide-react\';',
    'Eye': 'import { Eye } from \'lucide-react\';',
    'EyeOff': 'import { EyeOff } from \'lucide-react\';',
    'Loader2': 'import { Loader2 } from \'lucide-react\';',
    'User': 'import { User } from \'lucide-react\';',
    'Award': 'import { Award } from \'lucide-react\';',
    'MessageCircle': 'import { MessageCircle } from \'lucide-react\';',
    'HelpCircle': 'import { HelpCircle } from \'lucide-react\';',
    'Edit2': 'import { Edit2 } from \'lucide-react\';',
    'Save': 'import { Save } from \'lucide-react\';',
    'X': 'import { X } from \'lucide-react\';',
    'ArrowLeft': 'import { ArrowLeft } from \'lucide-react\';',
    'CheckCircle': 'import { CheckCircle } from \'lucide-react\';',
    'CheckCircle2': 'import { CheckCircle2 } from \'lucide-react\';',
    'ThumbsUp': 'import { ThumbsUp } from \'lucide-react\';',
    'ThumbsDown': 'import { ThumbsDown } from \'lucide-react\';',
    'Tag': 'import { Tag } from \'lucide-react\';',
    'Clock': 'import { Clock } from \'lucide-react\';',
    'Trash2': 'import { Trash2 } from \'lucide-react\';',
    'Send': 'import { Send } from \'lucide-react\';',
    'Search': 'import { Search } from \'lucide-react\';',
    'Filter': 'import { Filter } from \'lucide-react\';',
    'Plus': 'import { Plus } from \'lucide-react\';',
    'Check': 'import { Check } from \'lucide-react\';',
    'Lock': 'import { Lock } from \'lucide-react\';',
    'ShieldCheck': 'import { ShieldCheck } from \'lucide-react\';',
    'ArrowRight': 'import { ArrowRight } from \'lucide-react\';',
    'Crown': 'import { Crown } from \'lucide-react\';',
    'ChevronUp': 'import { ChevronUp } from \'lucide-react\';',
    'ChevronDown': 'import { ChevronDown } from \'lucide-react\';',
    'Minus': 'import { Minus } from \'lucide-react\';',
    'Zap': 'import { Zap } from \'lucide-react\';',
    'Globe': 'import { Globe } from \'lucide-react\';',
    'LogOut': 'import { LogOut } from \'lucide-react\';',
    'Settings': 'import { Settings } from \'lucide-react\';'
};

function processDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            processFile(fullPath);
        }
    });
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    let missingImports = [];
    
    // Special case for React
    if (content.includes('<') && !content.includes('import React')) {
        missingImports.push('import React from \'react\';');
    }
    
    Object.keys(dictionary).forEach(key => {
        // Only check if it's not already imported
        const importRegex = new RegExp(\import\\\\s+.*?\\\\b\\\\\b.*?;?\, 'g');
        if (!importRegex.test(content)) {
            // Check if variable is used
            // Using regex to check for <Component or Component( or <Component. or Component.
            // A bit broad, so we check for exact word boundary
            const usageRegex = new RegExp(\\\\\b\\\\\b\, 'g');
            if (usageRegex.test(content)) {
                
                // Construct relative path for local files
                let imp = dictionary[key];
                
                // Adjust relative paths if file is inside a subdirectory
                if (imp.includes('./')) {
                    const depth = filePath.split(path.sep).length - srcDir.split(path.sep).length - 1;
                    const prefix = depth > 0 ? '../'.repeat(depth) : './';
                    imp = imp.replace(/'\\.\\//, \'\\);
                }
                
                missingImports.push(imp);
            }
        }
    });

    if (missingImports.length > 0) {
        // Remove duplicates if lucide-react or react-router-dom are combined
        // Group them
        let lucideIcons = [];
        let reactRouter = [];
        let reactCore = [];
        let others = [];
        
        missingImports.forEach(imp => {
            if (imp.includes('lucide-react')) {
                lucideIcons.push(imp.match(/import { (.*?) }/)[1]);
            } else if (imp.includes('react-router-dom')) {
                reactRouter.push(imp.match(/import { (.*?) }/)[1]);
            } else if (imp.includes('} from \\'react\\'')) {
                reactCore.push(imp.match(/import { (.*?) }/)[1]);
            } else {
                others.push(imp);
            }
        });
        
        let finalImports = [];
        if (lucideIcons.length > 0) finalImports.push(\import { \ } from 'lucide-react';\);
        if (reactRouter.length > 0) finalImports.push(\import { \ } from 'react-router-dom';\);
        if (reactCore.length > 0) finalImports.push(\import { \ } from 'react';\);
        finalImports = finalImports.concat(others);
        
        // Remove existing grouped imports that were missed?
        // Let's just prepend to file
        content = finalImports.join('\\n') + '\\n\\n' + content;
        fs.writeFileSync(filePath, content);
        console.log(\Fixed \\);
    }
}

processDirectory(srcDir);
