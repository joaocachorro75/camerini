
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppData } from '../types';
import Navbar from '../components/Navbar';
import { ChevronLeft, Calendar, ArrowRight } from 'lucide-react';

interface BlogListPageProps {
  data: AppData;
}

const BlogListPage: React.FC<BlogListPageProps> = ({ data }) => {
  const { blog, config } = data;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Blog | ${config.seo.title}`;
  }, [config.seo.title]);

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
            <h1 className="text-4xl md:text-6xl font-black font-display text-gray-900">
              Blog da <span className="text-amber-500 text-outline">Camerini</span>
            </h1>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl">
              Fique por dentro das novidades do setor de terraplanagem, dicas técnicas e bastidores das nossas obras.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blog.map((post) => (
              <Link 
                to={`/blog/${post.slug}`} 
                key={post.id} 
                className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      {post.date}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-amber-500 transition-colors leading-tight mb-4">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-amber-500 font-black text-xs uppercase tracking-widest group-hover:gap-2 transition-all">
                    Ler Artigo Completo
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {blog.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">Nenhum artigo publicado ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
