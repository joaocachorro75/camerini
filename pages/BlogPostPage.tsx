
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppData } from '../types';
import { ChevronLeft, Calendar, Share2, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

interface BlogPostPageProps {
  data: AppData;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ data }) => {
  const { slug } = useParams<{ slug: string }>();
  const post = data.blog.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Camerini Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.metaDescription);
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) {
    return <div className="p-20 text-center">Post não encontrado. <Link to="/">Voltar</Link></div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar logo={data.config.logo} />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-amber-500 hover:text-amber-600 font-bold mb-8 transition-colors">
            <ChevronLeft size={20} className="mr-1" />
            Voltar para o Início
          </Link>

          <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full aspect-[21/9] object-cover" />
            
            <div className="p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="text-amber-500 font-bold">TERRAPLANAGEM</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold font-display text-gray-900 leading-tight">
                {post.title}
              </h1>

              <div 
                className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors">
                    <Share2 size={18} />
                    Compartilhar
                  </button>
                  <a 
                    href={`https://wa.me/${data.config.contact.whatsapp}?text=Vi o post ${post.title} e gostaria de saber mais.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <MessageCircle size={18} />
                    Comentar via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
