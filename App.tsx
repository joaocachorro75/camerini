
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { db } from './db.ts';
import { AppData } from './types.ts';

// Pages
import LandingPage from './pages/LandingPage.tsx';
import BlogPostPage from './pages/BlogPostPage.tsx';
import BlogListPage from './pages/BlogListPage.tsx';
import GalleryPage from './pages/GalleryPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';

const App: React.FC = () => {
  const [data, setData] = useState<AppData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        const remoteData = await db.get();
        if (isMounted) setData(remoteData);
      } catch (e) {
        console.warn("Erro ao carregar dados:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    init();
    return () => { isMounted = false; };
  }, []);

  const updateData = async (newData: AppData) => {
    setData(newData);
    await db.save(newData);
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center">
          <p className="font-display font-bold uppercase tracking-widest text-amber-500 animate-pulse">Camerini Terraplanagem</p>
          <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-[0.3em]">Preparando sua infraestrutura...</p>
        </div>
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
