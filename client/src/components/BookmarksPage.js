import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get('/api/v1/bookmarks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookmarks(response.data.data); // Access the data array within the response
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };
    fetchBookmarks();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`/api/v1/bookmarks/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookmarks(bookmarks.filter(item => item._id !== itemId));
      setPopupMessage('Item removed from bookmarks');
      setTimeout(() => {
        setPopupMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error removing item from bookmarks:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Bookmarks</h2>
      {popupMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {popupMessage}
        </div>
      )}
      {bookmarks.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
              style={{ width: "250px", height: "320px" }}
            >
              <div className="p-4">
                <div className="flex justify-center items-center mb-4 h-20">
                  <img
                    src={bookmark.imageToDisplay}
                    alt="Logo"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="px-4 text-lg font-bold text-center mb-2">{bookmark.title}</div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">👁 {bookmark.views}</span>
                    <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">🌍 {bookmark.region}</span>
                    <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">KPR{bookmark.kprRating}/10</span>
                    <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">{bookmark.category}</span>
                  </div>
                </div>
                <div className="flex justify-center items-center p-4 border-t border-gray-300">
                  <button
                    className="text-red-500"
                    onClick={() => handleRemove(bookmark._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
