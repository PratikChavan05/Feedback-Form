import { useState, useEffect } from 'react';
import { MessageSquare, Loader, RefreshCw, User, Mail, Calendar } from 'lucide-react';

const FeedbackList = ({ darkMode }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  
  const fetchFeedbacks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/feedbacks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch feedback data');
      }
      
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFeedbacks();
  }, []);
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const containerClasses = `p-8 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 shadow-gray-900/30' : 'bg-white shadow-gray-200/60'}`;
  const cardClasses = (id) => `p-5 mb-5 rounded-xl border transition-all duration-300 cursor-pointer ${
    activeItem === id
      ? darkMode 
        ? 'bg-gray-700 border-blue-500 shadow-md shadow-blue-500/20' 
        : 'bg-blue-50 border-blue-500 shadow-md'
      : darkMode 
        ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
  }`;
  
  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Customer Feedback
        </h2>
        
        <button
          onClick={fetchFeedbacks}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-sm'
          }`}
          disabled={isLoading}
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center p-16">
          <div className="text-center">
            <Loader size={40} className={`animate-spin mx-auto mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading feedback...</p>
          </div>
        </div>
      ) : error ? (
        <div className="p-6 text-red-500 bg-red-50 rounded-lg border-l-4 border-red-500">
          <p className="font-medium">{error}</p>
          <button 
            onClick={fetchFeedbacks}
            className="mt-3 text-sm text-red-600 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      ) : feedbacks.length === 0 ? (
        <div className={`p-12 text-center rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full mb-4 bg-blue-100 text-blue-500">
            <MessageSquare size={32} />
          </div>
          <h3 className={`text-xl font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>No feedback yet</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {feedbacks.map((feedback) => (
            <div 
              key={feedback._id} 
              className={cardClasses(feedback._id)}
              onClick={() => setActiveItem(activeItem === feedback._id ? null : feedback._id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'}`}>
                    <User size={18} className={darkMode ? 'text-gray-300' : 'text-blue-600'} />
                  </div>
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{feedback.fullName}</h3>
                </div>
                <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Calendar size={14} className="mr-1" />
                  <span>{formatDate(feedback.timestamp)}</span>
                </div>
              </div>
              
              <div className="flex items-center ml-1 mb-3">
                <Mail size={14} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{feedback.email}</p>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-start gap-3">
                  <MessageSquare size={18} className={`mt-1 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{feedback.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;