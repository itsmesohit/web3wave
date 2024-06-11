import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      axios.get('/api/v1/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUserData(response.data.user);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setIsLoggedIn(false);
      });
    } else {
      setIsLoggedIn(false);
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    window.location.reload();
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white">
          <div className="text-xl font-bold">Koinpr</div>
          <div className="text-sm">
            A <span className="font-bold">Todayq</span> Product
          </div>
        </Link>
        <div className="flex space-x-4 relative" ref={dropdownRef}>
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {userData && userData.firstName}
              </button>
              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-50"
                  style={{ top: '100%' }}
                >
                  <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</Link>
                  <Link to="/myaccount" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Account</Link>
                  <Link to="/bookmarks" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Bookmarks</Link>
                  <Link to="/order-history" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Order History</Link>
                  <Link to="/cart" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Cart</Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
