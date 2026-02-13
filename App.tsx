
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
  const [data, setData] = useState<AppData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const remoteData = await db.get();
        setData(remoteData);
      } catch (e) {
        console.error("Failed to load data, but app will continue with defaults.", e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const updateData = async (newData: AppData) => {
    setData(newData);
    await db.save(newData);
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-display font-bold uppercase tracking-widest text-amber-500 animate-pulse">Carregando Camerini...</p>
      </div>
    );
  }

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
