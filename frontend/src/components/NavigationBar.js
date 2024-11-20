// frontend/src/components/NavigationBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="flex items-center py-4">
              <span className="font-semibold text-gray-500 text-lg">GP-AgileTchat</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/register"
              className={`py-2 px-4 rounded ${
                location.pathname === '/register'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              Register
            </Link>
            <Link
              to="/login"
              className={`py-2 px-4 rounded ${
                location.pathname === '/login'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;