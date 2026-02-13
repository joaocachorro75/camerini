
import React, { useEffect, useState } from 'react';
import { AppData, Lead } from '../types';
import Navbar from '../components/Navbar';
import LeadForm from '../components/LeadForm';
import { 
  ChevronRight, 
  CheckCircle, 
  HardHat, 
  Pickaxe, 
  Hammer, 
  Droplets,
  Instagram,
  Facebook,
  Mail,
  MapPin,
  PhoneCall,
  MessageCircle,
  Star,
  Play,
  X,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface LandingPageProps {
  data: AppData;
  updateData: (data: AppData) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ data, updateData }) => {
  const { config, services, testimonials, blog, gallery } = data;
  const [selectedMedia, setSelectedMedia] = useState<typeof gallery[0] | null>(null);

  useEffect(() => {
    document.title = config.seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', config.seo.description);
  }, [config.seo]);

  const handleAddLead = (lead: Lead) => {
    updateData({
      ...data,
      leads: [lead, ...data.leads]
    });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'HardHat': return <HardHat className="text-amber-500" size={32} />;
      case 'Pickaxe': return <Pickaxe className="text-amber-500" size={32} />;
      case 'Hammer': return <Hammer className="text-amber-500" size={32} />;
      case 'Droplets': return <Droplets className="text-amber-500" size={32} />;
      default: return <CheckCircle className="text-amber-500" size={32} />;
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar logo={config.logo} />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={config.hero.bgImage} 
            alt="Terraplanagem" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 animate-in slide-in-from-left duration-1000">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight">
              {config.hero.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              {config.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/20"
              >
                {config.hero.cta}
                <ChevronRight size={20} />
              </a>
              <a 
                href={`https://wa.me/${config.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-4 px-8 rounded-full text-center border border-white/30 transition-all flex items-center justify-center gap-2"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="hidden md:block animate-in slide-in-from-right duration-1000">
            <LeadForm onAddLead={handleAddLead} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src={config.about.image} 
                alt="Equipe" 
                className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-amber-500 p-8 rounded-3xl hidden md:block border-8 border-white">
                <span className="text-white font-bold text-4xl block">{config.about.stats[1]?.value || '20+'}</span>
                <span className="text-amber-100 uppercase tracking-widest text-sm font-bold">{config.about.stats[1]?.label || 'Anos'}</span>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest">{config.about.sectionTag}</h2>
              <h3 className="text-4xl font-bold font-display text-gray-900 leading-tight">
                {config.about.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {config.about.text}
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {config.about.stats.map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="text-2xl font-black text-amber-500">{stat.value}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest">{config.servicesHeader.tag}</h2>
            <h3 className="text-4xl font-bold font-display text-gray-900">{config.servicesHeader.title}</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {getIcon(service.icon)}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left space-y-2">
                <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest">Portfolio de Obras</h2>
                <h3 className="text-3xl font-bold font-display text-gray-900">Nossa Experiência no Campo</h3>
              </div>
              <Link to="/gallery" className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-amber-500 transition-all flex items-center gap-2 group">
                Ver Galeria Completa
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {gallery.slice(0, 3).map((item) => (
               <div 
                  key={item.id} 
                  onClick={() => setSelectedMedia(item)}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl group cursor-pointer bg-gray-100 shadow-md transition-all hover:shadow-2xl"
               >
                  {item.type === 'image' ? (
                    <img src={item.url} alt={item.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full relative">
                      <img 
                        src={`https://img.youtube.com/vi/${item.url.split('v=')[1] || item.url.split('/').pop()}/0.jpg`} 
                        alt={item.alt}
                        className="w-full h-full object-cover brightness-75 transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-xl transform transition-transform group-hover:scale-110">
                          <Play fill="white" size={36} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">{item.type === 'image' ? 'Fotografia' : 'Vídeo'}</span>
                    <span className="text-white font-bold text-xl">{item.alt}</span>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Media Lightbox */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors bg-white/10 p-2 rounded-full"
          >
            <X size={32} />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl">
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.url} className="w-full h-full object-contain" alt={selectedMedia.alt} />
            ) : (
              <iframe 
                className="w-full h-full" 
                src={getEmbedUrl(selectedMedia.url) + "?autoplay=1"} 
                title={selectedMedia.alt} 
                frameBorder="0" 
                allow="autoplay; encrypted-media" 
                allowFullScreen
              />
            )}
          </div>
          <div className="absolute bottom-8 text-center text-white font-bold text-xl">
            {selectedMedia.alt}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="py-24 bg-amber-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 text-white">
          <HardHat size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-12 relative z-10">
          <h3 className="text-3xl font-bold font-display">O que nossos parceiros dizem</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl space-y-4">
                <div className="flex text-amber-300">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="italic text-lg text-white">"{t.text}"</p>
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-amber-100 font-medium">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Feed */}
      <section id="blog" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest">Blog & Notícias</h2>
              <h3 className="text-3xl font-bold font-display text-gray-900">Dicas para sua Construção</h3>
            </div>
            <Link to="/blog" className="bg-amber-500 text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center gap-2 group shadow-lg shadow-amber-500/20">
              Ver Todos os Artigos
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blog.slice(0, 3).map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="group space-y-4 bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-[16/9] rounded-[1.8rem] overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="px-2 pb-4 space-y-2">
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">{post.date}</span>
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-amber-500 transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map Placeholder */}
      <section id="contact" className="py-24 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white space-y-8">
            <h3 className="text-4xl font-bold font-display leading-tight">Solicite seu Atendimento Especializado</h3>
            <p className="text-gray-400 text-lg leading-relaxed">{config.footer.description}</p>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500">
                  <MapPin size={28} />
                </div>
                <div>
                  <div className="font-bold text-amber-500 uppercase tracking-widest text-[10px]">Endereço</div>
                  <div className="text-gray-300">{config.contact.address}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500">
                  <PhoneCall size={28} />
                </div>
                <div>
                  <div className="font-bold text-amber-500 uppercase tracking-widest text-[10px]">Telefone</div>
                  <div className="text-gray-300">{config.contact.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500">
                  <Mail size={28} />
                </div>
                <div>
                  <div className="font-bold text-amber-500 uppercase tracking-widest text-[10px]">E-mail corporativo</div>
                  <div className="text-gray-300">{config.contact.email}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <LeadForm onAddLead={handleAddLead} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/5 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="space-y-6">
              <Link to="/" className="inline-flex items-center gap-3">
                <img src={config.logo} className="h-12 w-12 rounded-xl object-contain" alt="Logo" />
                <div className="flex flex-col text-left">
                  <span className="text-2xl font-black font-display text-white">CAMERINI</span>
                  <span className="text-xs text-amber-500 font-bold tracking-widest uppercase">Terraplanagem</span>
                </div>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Líderes no setor com foco em precisão, segurança e economia para sua obra de infraestrutura.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Links Úteis</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><a href="#hero" onClick={(e) => handleAnchorClick(e, '#hero')} className="hover:text-amber-500 transition-colors">Página Inicial</a></li>
                <li><a href="#about" onClick={(e) => handleAnchorClick(e, '#about')} className="hover:text-amber-500 transition-colors">Nossa História</a></li>
                <li><a href="#gallery" onClick={(e) => handleAnchorClick(e, '#gallery')} className="hover:text-amber-500 transition-colors">Galeria de Mídias</a></li>
                <li><Link to="/login" className="hover:text-amber-500 transition-colors">Painel Admin</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Siga-nos</h4>
              <div className="flex justify-center md:justify-start gap-4">
                <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-all transform hover:scale-110">
                  <Instagram size={20} />
                </a>
                <a href={config.contact.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-all transform hover:scale-110">
                  <Facebook size={20} />
                </a>
                <a href={`https://wa.me/${config.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all transform hover:scale-110">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
              {config.footer.seoKeywords}
            </div>
            <div className="text-gray-500 text-xs">
              {config.footer.copyright}
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a 
        href={`https://wa.me/${config.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 group flex items-center justify-center"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Precisa de orçamento? Chame agora!
        </span>
      </a>
    </div>
  );
};

export default LandingPage;
