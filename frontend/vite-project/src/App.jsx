import { useState, useEffect } from 'react';
import { Send, Inbox, Sun, Moon } from 'lucide-react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './App.css';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
  };
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-b from-blue-50 to-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
              <MessageIcon />
            </div>
            <h1 className="text-3xl font-bold">Feedback Hub</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 hover:rotate-12 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
                  : 'bg-white hover:bg-gray-200 text-blue-800 shadow-md'
              }`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>
        
        <main>
          <div className="flex justify-center mb-10">
            <div className={`inline-flex rounded-lg p-1 ${darkMode ? 'bg-gray-700' : 'bg-white shadow-md'}`}>
              <button
                onClick={() => setShowAdmin(false)}
                className={`flex items-center gap-2 px-5 py-3 rounded-md transition-all duration-200 ${
                  !showAdmin 
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white shadow-sm' 
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Send size={18} />
                <span className="font-medium">Submit</span>
              </button>
              <button
                onClick={() => setShowAdmin(true)}
                className={`flex items-center gap-2 px-5 py-3 rounded-md transition-all duration-200 ${
                  showAdmin 
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white shadow-sm' 
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Inbox size={18} />
                <span className="font-medium">Reviews</span>
              </button>
            </div>
          </div>
          
          <div className="transition-all duration-500 transform">
            {showAdmin ? <FeedbackList darkMode={darkMode} /> : <FeedbackForm darkMode={darkMode} />}
          </div>
        </main>
        
        <footer className={`mt-16 py-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p className="font-medium">© {new Date().getFullYear()} Feedback Hub | Making your voice heard</p>
        </footer>
      </div>
    </div>
  );
}

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default App;