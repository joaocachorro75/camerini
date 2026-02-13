
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppData, GalleryItem } from '../types';
import Navbar from '../components/Navbar';
import { ChevronLeft, Play, X, ImageIcon, Video, Filter } from 'lucide-react';

interface GalleryPageProps {
  data: AppData;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ data }) => {
  const { gallery, config } = data;
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Galeria | ${config.seo.title}`;
  }, [config.seo.title]);

  const filteredGallery = gallery.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  const getYoutubeThumb = (url: string) => {
    const id = url.split('v=')[1] || url.split('/').pop();
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar logo={config.logo} />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center text-amber-500 hover:text-amber-600 font-bold mb-6 transition-colors group">
              <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
              Voltar para o Início
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-black font-display text-gray-900">
                  Nossa <span className="text-amber-500">Galeria</span>
                </h1>
                <p className="text-gray-500 mt-4 text-lg max-w-2xl">
                  Confira em detalhes a qualidade das nossas operações através de fotos e vídeos reais de nossos canteiros de obras.
                </p>
              </div>
              
              <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm self-start">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-amber-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Tudo
                </button>
                <button 
                  onClick={() => setFilter('image')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${filter === 'image' ? 'bg-amber-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <ImageIcon size={14} /> Fotos
                </button>
                <button 
                  onClick={() => setFilter('video')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${filter === 'video' ? 'bg-amber-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Video size={14} /> Vídeos
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedMedia(item)}
                className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] group cursor-pointer bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {item.type === 'image' ? (
                  <img 
                    src={item.url} 
                    alt={item.alt} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <img 
                      src={getYoutubeThumb(item.url)} 
                      alt={item.alt}
                      className="w-full h-full object-cover brightness-75 transition-transform duration-1000 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888941255-081d746fc2c2?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-2xl transform transition-transform group-hover:scale-110">
                        <Play fill="white" size={36} className="ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                    {item.type === 'image' ? 'Obra / Detalhe' : 'Registro em Vídeo'}
                  </span>
                  <span className="text-white font-bold text-xl">{item.alt}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredGallery.length === 0 && (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
              <div className="flex flex-col items-center gap-4 text-gray-300">
                <Filter size={64} strokeWidth={1} />
                <p className="font-bold">Nenhum item encontrado nesta categoria.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Media Lightbox */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in duration-300">
          <button 
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors bg-white/10 p-3 rounded-full z-[110]"
          >
            <X size={32} />
          </button>
          
          <div className="w-full max-w-6xl max-h-[85vh] flex flex-col items-center gap-6">
            <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-[0_0_100px_rgba(251,191,36,0.1)] relative">
              {selectedMedia.type === 'image' ? (
                <img src={selectedMedia.url} className="w-full h-full object-contain" alt={selectedMedia.alt} />
              ) : (
                <iframe 
                  className="w-full h-full" 
                  src={getEmbedUrl(selectedMedia.url) + "?autoplay=1&rel=0"} 
                  title={selectedMedia.alt} 
                  frameBorder="0" 
                  allow="autoplay; encrypted-media; picture-in-picture" 
                  allowFullScreen
                />
              )}
            </div>
            <div className="text-center">
               <h2 className="text-white font-black text-2xl font-display">{selectedMedia.alt}</h2>
               <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">Camerini Terraplanagem Portfolio</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
