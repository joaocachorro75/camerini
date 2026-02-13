
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  logo: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Início', href: '#hero' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contato', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname !== '/') {
      // If we are not on the landing page, the anchor won't work directly.
      // We let the default link behavior happen if it's a real link, 
      // but for this SPA we usually want to go home first.
      return;
    }
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-xl py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl overflow-hidden bg-amber-500 flex items-center justify-center p-1 shadow-lg transition-transform group-hover:scale-105">
              <img 
                src={logo} 
                alt="Logo Camerini" 
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888941255-081d746fc2c2?auto=format&fit=crop&q=80&w=200';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl md:text-2xl font-black font-display tracking-tight leading-none ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                CAMERINI
              </span>
              <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ${isScrolled ? 'text-amber-500' : 'text-amber-400'}`}>
                Terraplanagem
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              location.pathname === '/' ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`text-sm font-bold uppercase tracking-wider transition-all hover:text-amber-500 cursor-pointer ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to="/"
                  className={`text-sm font-bold uppercase tracking-wider transition-all hover:text-amber-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link 
              to="/login" 
              className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded border transition-colors ${
                isScrolled ? 'text-gray-400 border-gray-200 hover:bg-gray-50' : 'text-white/60 border-white/20 hover:bg-white/10'
              }`}
            >
              Admin
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`p-2 rounded-lg ${isScrolled ? 'text-gray-900 bg-gray-100' : 'text-white bg-white/10'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-2xl absolute top-full left-0 right-0 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          {menuItems.map((item) => (
            location.pathname === '/' ? (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="block text-xl font-bold text-gray-800 border-b border-gray-50 pb-3 hover:text-amber-500 cursor-pointer"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xl font-bold text-gray-800 border-b border-gray-50 pb-3 hover:text-amber-500"
              >
                {item.name}
              </Link>
            )
          ))}
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-400 text-sm font-bold uppercase tracking-widest pt-4">Acesso Administrativo</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
