import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/v1/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCartItems(response.data.data); // Update with response.data.data
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, [token]);

  // Calculate total price only if cartItems is not undefined
  const totalPrice = cartItems ? cartItems.reduce((total, item) => total + item.price, 0) : 0;

  const handleCheckout = async () => {
    
    const contentIds = cartItems.map(item => item._id);
    try {
        const contentIds = cartItems.map(item => item._id);
        console.log('Content IDs kjhadfbg:', contentIds);
        
        const response = await axios.post(
            '/api/v1/order',
            { contentIds },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Order created rthf:', response.data);
        setPopupMessage('Order created successfully');
        setTimeout(() => {
            setPopupMessage('');
            window.location.href = '/orders';
        }, 3000);
    } catch (error) {
        console.error('Error creating order:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        setPopupMessage('Error creating order');
        setTimeout(() => {
            setPopupMessage('');
        }, 3000);
    }
};

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`/api/v1/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(cartItems.filter(item => item._id !== itemId));
      setPopupMessage('Item removed from cart');
      setTimeout(() => {
        setPopupMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {popupMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {popupMessage}
        </div>
      )}
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
              style={{ width: "250px", height: "320px" }}
            >
              <div className="p-4">
                <div className="flex justify-center items-center mb-4 h-20">
                  <img
                    src={item.imageToDisplay}
                    alt="Logo"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="px-4 text-lg font-bold text-center mb-2">{item.title}</div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">👁 {item.views}</span>
                    <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">🌍 {item.region}</span>
                    <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">KPR{item.kprRating}/10</span>
                    <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">{item.category}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border-t border-gray-300">
                  <div className="text-blue-600 font-bold">Price: ${item.price}</div>
                  <button
                    className="text-red-500"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 col-span-full">
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
