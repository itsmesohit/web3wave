import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';


const RightSidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  const topPublishers = [
    'Bitcoint BTC',
    'Ethereum ETH',
    'Tether USDT',
    'BNB Binance',
    'Solana SOL',
  ];

  return (
    <div className="bg-gray-200 p-4 ml-2 rounded-md shadow-md">
      <h2 className="font-bold text-lg mb-4">Todayq Latest</h2>
      
      {/* Conditional Card: Add Your Own Publishers */}
      {isLoggedIn && (
        <div className="bg-white p-4 mb-4 rounded-md shadow-md">
          <h3 className="font-bold mb-2">Add Offering</h3>
          <p>If you are a publisher, you can add your own details here.</p>
        
          <Link to="/add-publish" className="bg-blue-500 text-white px-4 py-2 rounded">Add Offering</Link>
        </div>
      )}
      
      {/* Static Card: Top Publishers */}
      <div className="bg-white p-4 mb-4 rounded-md shadow-md">
        <h3 className="font-bold mb-2">Top Publishers</h3>
        <ul className="list-disc list-inside">
          {topPublishers.map((publisher, index) => (
            <li key={index}>{publisher}</li>
          ))}
        </ul>
      </div>

      {/* Static Card: Contact Info */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="font-bold mb-2">Contact Info</h3>
        <p>Email: <span className="break-words">contact@example.com</span></p>
        <p>Phone: +1234567890</p>
      </div>
    </div>
  );
};

export default RightSidebar;
