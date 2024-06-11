import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MyAccountPage = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const token = Cookies.get('token');
  
  useEffect(() => {
    // Fetch user data from the backend API
    axios.get('/api/v1/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        setUserData(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Send updated user data to the backend API
    axios.put('/api/v1/profile', userData)
      .then(response => {
        console.log('User data updated successfully:', response.data);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">My Account</h2>
      {editMode ? (
        <div>
          <label className="block mb-2">First Name:</label>
          <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 mb-2" />
          <label className="block mb-2">Last Name:</label>
          <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 mb-2" />
          <label className="block mb-2">Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 mb-2" />
          {/* Add more input fields for other user details */}
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      ) : (
        <div>
          <p className="mb-2"><strong>First Name:</strong> {userData.firstName}</p>
          <p className="mb-2"><strong>Last Name:</strong> {userData.lastName}</p>
          <p className="mb-2"><strong>Email:</strong> {userData.email}</p>
          {/* Display other user details */}
          <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
        </div>
      )}
    </div>
  );
};

export default MyAccountPage;
