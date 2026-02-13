
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { db } from './db';
import { AppData } from './types';

// Pages
import LandingPage from './pages/LandingPage';
import BlogPostPage from './pages/BlogPostPage';
import BlogListPage from './pages/BlogListPage';
import GalleryPage from './pages/GalleryPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  const [data, setData] = useState<AppData>(db.get());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    db.save(data);
  }, [data]);

  const updateData = (newData: AppData) => {
    setData(newData);
    db.save(newData);
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage data={data} updateData={updateData} />} />
        <Route path="/blog" element={<BlogListPage data={data} />} />
        <Route path="/blog/:slug" element={<BlogPostPage data={data} />} />
        <Route path="/gallery" element={<GalleryPage data={data} />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route 
          path="/admin/*" 
          element={isLoggedIn ? <AdminDashboard data={data} onUpdate={updateData} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
