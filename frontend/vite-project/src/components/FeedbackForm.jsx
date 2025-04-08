import { useState } from 'react';
import { Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';

const FeedbackForm = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback');
      }
      
      setFormData({
        fullName: '',
        email: '',
        message: ''
      });
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };
  
  const formClasses = `p-8 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 shadow-gray-900/30' : 'bg-white shadow-gray-200/60'}`;
  const labelClasses = `block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;
  const inputClasses = `w-full p-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 focus:ring-blue-500 text-white placeholder-gray-400' 
      : 'bg-gray-50 border border-gray-300 focus:ring-blue-500 placeholder-gray-400'
  }`;
  const buttonClasses = `w-full flex justify-center items-center gap-2 p-4 rounded-lg text-white font-medium transition-all duration-200 transform hover:translate-y-px shadow-md ${
    isSubmitting 
      ? darkMode ? 'bg-blue-700 cursor-not-allowed opacity-80' : 'bg-blue-400 cursor-not-allowed'
      : darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
  }`;
  
  return (
    <div className={formClasses}>
      <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'} text-center`}>
        We Value Your Feedback
      </h2>
      
      {submitStatus === 'success' && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-green-100 text-green-800 rounded-lg border-l-4 border-green-500 animate-fadeIn">
          <CheckCircle size={22} />
          <span className="font-medium">Thank you! Your feedback was submitted successfully.</span>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-red-100 text-red-800 rounded-lg border-l-4 border-red-500 animate-fadeIn">
          <AlertCircle size={22} />
          <span className="font-medium">{errorMessage || 'An error occurred. Please try again.'}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClasses} htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className={labelClasses} htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className={labelClasses} htmlFor="message">
            Your Feedback
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className={`${inputClasses} resize-none`}
            placeholder="Please share your thoughts or suggestions..."
          ></textarea>
        </div>
        
        <button type="submit" disabled={isSubmitting} className={buttonClasses}>
          {isSubmitting ? (
            <>
              <Loader size={20} className="animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send size={20} /> Submit Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;