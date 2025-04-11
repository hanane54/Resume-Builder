import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-md mx-auto">
        {/* Error code */}
        <h1 className="text-9xl font-bold text-indigo-600 mb-2">404</h1>
        
        {/* Animation */}
        <div className="my-4">
          <div className="relative inline-block">
            <div className="w-16 h-16 border-8 border-indigo-600 border-dashed rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-indigo-600">?</span>
            </div>
          </div>
        </div>
        
        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={goBack}
            className="flex items-center justify-center gap-2 bg-white text-indigo-600 border border-indigo-600 font-medium px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <button
            onClick={goHome}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Home size={18} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;