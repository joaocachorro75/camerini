
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
    let isMounted = true;
    
    const init = async () => {
      // Timeout de 2 segundos para não ficar preso na tela de carregamento se a rede estiver lenta
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout")), 2000)
      );

      try {
        // Tenta carregar da API, mas aceita o fallback do db.ts se falhar
        const remoteData = await Promise.race([db.get(), timeoutPromise]) as AppData;
        if (isMounted) setData(remoteData);
      } catch (e) {
        console.warn("Usando dados locais de fallback devido a lentidão ou erro na API.");
        // Se a API falhar ou der timeout, tenta pegar os dados locais (db.get já faz isso internamente)
        const localData = await db.get();
        if (isMounted) setData(localData);
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
