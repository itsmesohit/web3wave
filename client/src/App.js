// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainLayout from './components/MainLayout';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import MyAccountPage from './components/MyAccountPage';
import BookmarksPage from './components/BookmarksPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import CartPage from './components/CartPage';
import AddPublishPage from './components/AddPublishPage';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/myaccount" element={<MyAccountPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add-publish" element={<AddPublishPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
