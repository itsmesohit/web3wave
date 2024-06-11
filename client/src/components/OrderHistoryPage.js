// src/components/OrderHistoryPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('/api/v1/order', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data.data); // Updated to match the response structure
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <div className="mt-2">
                <p className="font-bold">Items:</p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id} className="mb-2 p-2 border border-gray-200 rounded-lg">
                      <div className="flex">
                        <img
                          src={item.imageToDisplay}
                          alt={item.title}
                          className="w-16 h-16 rounded-full mr-4"
                        />
                        <div>
                          <p><strong>Title:</strong> {item.title}</p>
                          <p><strong>Price:</strong> ${item.price}</p>
                          <p><strong>Category:</strong> {item.category}</p>
                          <p><strong>Views:</strong> {item.views}</p>
                          <p><strong>Region:</strong> {item.region}</p>
                          <p><strong>Rating:</strong> {item.kprRating}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;
