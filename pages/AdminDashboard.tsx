
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppData, BlogPost, Lead, Service, Testimonial, GalleryItem } from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Download,
  Image as ImageIcon,
  Save,
  Upload,
  HardHat,
  Briefcase,
  Video,
  Star,
  MapPin,
  Globe,
  Monitor,
  ChevronRight
} from 'lucide-react';

interface AdminDashboardProps {
  data: AppData;
  onUpdate: (data: AppData) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, onUpdate }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.location.reload();
  };

  const exportLeadsCSV = () => {
    const headers = ['Nome', 'WhatsApp', 'Data'];
    const rows = data.leads.map(l => [l.name, l.whatsapp, new Date(l.date).toLocaleString()]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'leads_camerini.csv');
    link.click();
  };

  const AdminNav = () => (
    <div className="w-64 bg-gray-900 min-h-screen text-white p-6 space-y-8 flex flex-col fixed left-0 top-0 overflow-y-auto border-r border-gray-800">
      <div className="font-bold text-xl border-b border-gray-800 pb-4 flex items-center gap-2">
        <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center p-2 shadow-lg">
          <img src={data.config.logo} className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-black tracking-tight">CAMERINI</span>
          <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Painel Admin</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        <Link to="/admin" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group">
          <LayoutDashboard size={18} className="text-gray-400 group-hover:text-amber-500" /> Visão Geral
        </Link>
        <Link to="/admin/content" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group">
          <Settings size={18} className="text-gray-400 group-hover:text-amber-500" /> Conteúdo Site
        </Link>
        <Link to="/admin/services" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group">
          <Briefcase size={18} className="text-gray-400 group-hover:text-amber-500" /> Serviços
        </Link>
        <Link to="/admin/testimonials" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group">
          <Star size={18} className="text-gray-400 group-hover:text-amber-500" /> Depoimentos
        </Link>
        <Link to="/admin/gallery" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group">
          <ImageIcon size={18} className="text-gray-400 group-hover:text-amber-500" /> Galeria & Mídia
        </Link>
        <Link to="/admin/blog" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group">
          <FileText size={18} className="text-gray-400 group-hover:text-amber-500" /> Blog
        </Link>
        <Link to="/admin/leads" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group">
          <Users size={18} className="text-gray-400 group-hover:text-amber-500" /> Leads
        </Link>
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors mt-auto">
        <LogOut size={18} /> Sair do Sistema
      </button>
    </div>
  );

  const LeadsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Leads Capturados</h2>
        <button onClick={exportLeadsCSV} className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-amber-500/20">
          <Download size={18} /> Exportar Excel (CSV)
        </button>
      </div>
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black tracking-widest">
            <tr>
              <th className="px-8 py-6">Nome do Cliente</th>
              <th className="px-8 py-6">WhatsApp</th>
              <th className="px-8 py-6 text-right">Data de Recebimento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.leads.length > 0 ? data.leads.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6 font-bold text-gray-900">{lead.name}</td>
                <td className="px-8 py-6">
                  <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" className="text-amber-600 font-bold hover:underline">{lead.whatsapp}</a>
                </td>
                <td className="px-8 py-6 text-gray-500 text-right text-sm">{new Date(lead.date).toLocaleString('pt-BR')}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3} className="px-8 py-20 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-4">
                    <Users size={48} className="opacity-20" />
                    <p className="font-bold">Aguardando novos leads...</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ContentEditor = () => {
    const [config, setConfig] = useState(data.config);
    
    const handleSave = () => {
      onUpdate({ ...data, config });
      alert('Toda a estrutura do site foi atualizada com sucesso!');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          if (field === 'logo') setConfig({ ...config, logo: base64 });
          if (field === 'heroBg') setConfig({ ...config, hero: { ...config.hero, bgImage: base64 } });
          if (field === 'aboutImg') setConfig({ ...config, about: { ...config.about, image: base64 } });
          if (field === 'ogImage') setConfig({ ...config, seo: { ...config.seo, ogImage: base64 } });
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="space-y-8 pb-12">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Editar Conteúdo do Site</h2>
            <p className="text-gray-500">Altere textos, logos e imagens principais de forma dinâmica.</p>
          </div>
          <button onClick={handleSave} className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-2xl flex items-center gap-2 font-bold shadow-xl shadow-amber-500/20 transition-all active:scale-95">
            <Save size={20} /> Publicar Alterações
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LOGO & BRANDING */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><Globe size={20} className="text-amber-500"/> Identidade e Logo</h3>
            <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
               <div className="h-24 w-24 bg-white rounded-2xl shadow-inner flex items-center justify-center p-4">
                  <img src={config.logo} className="max-w-full max-h-full object-contain" />
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-gray-700">Logo do Site</span>
                  <label className="bg-gray-900 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-black transition-all text-sm font-bold inline-flex items-center gap-2">
                    <Upload size={14} /> Substituir Logo
                    <input type="file" onChange={e => handleFileUpload(e, 'logo')} className="hidden" />
                  </label>
               </div>
            </div>
          </div>

          {/* HERO SECTION */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><Monitor size={20} className="text-amber-500"/> Hero (Início)</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Título Hero" value={config.hero.title} onChange={e => setConfig({...config, hero: {...config.hero, title: e.target.value}})} className="w-full p-4 border rounded-2xl bg-gray-50 focus:ring-2 ring-amber-500 outline-none font-bold" />
              <textarea placeholder="Subtítulo persuasivo" rows={3} value={config.hero.subtitle} onChange={e => setConfig({...config, hero: {...config.hero, subtitle: e.target.value}})} className="w-full p-4 border rounded-2xl bg-gray-50 focus:ring-2 ring-amber-500 outline-none text-sm" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Texto do CTA" value={config.hero.cta} onChange={e => setConfig({...config, hero: {...config.hero, cta: e.target.value}})} className="w-full p-4 border rounded-2xl bg-gray-50" />
                <label className="bg-white border-2 border-dashed border-gray-200 p-3 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
                  <ImageIcon size={18} className="text-gray-400 mb-1" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Fundo Hero</span>
                  <input type="file" onChange={e => handleFileUpload(e, 'heroBg')} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* ABOUT SECTION */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6 lg:col-span-2">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><Briefcase size={20} className="text-amber-500"/> Seção Sobre e Números</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <input type="text" placeholder="Tag Seção" value={config.about.sectionTag} onChange={e => setConfig({...config, about: {...config.about, sectionTag: e.target.value}})} className="w-full p-4 border rounded-2xl bg-gray-50 text-xs font-bold text-amber-600 uppercase tracking-widest" />
                <input type="text" placeholder="Título Principal" value={config.about.title} onChange={e => setConfig({...config, about: {...config.about, title: e.target.value}})} className="w-full p-4 border rounded-2xl bg-gray-50 font-bold" />
                <textarea placeholder="Texto explicativo..." rows={5} value={config.about.text} onChange={e => setConfig({...config, about: {...config.about, text: e.target.value}})} className="w-full p-4 border rounded-2xl bg-gray-50 text-sm" />
              </div>
              <div className="space-y-4">
                <div className="relative group rounded-3xl overflow-hidden aspect-video bg-gray-100 border border-gray-200 shadow-inner">
                   <img src={config.about.image} className="w-full h-full object-cover" />
                   <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-bold uppercase tracking-widest gap-2">
                     <Upload size={24} /> Trocar Imagem Sobre
                     <input type="file" onChange={e => handleFileUpload(e, 'aboutImg')} className="hidden" />
                   </label>
                </div>
                <div className="grid grid-cols-3 gap-3">
                   {config.about.stats.map((s, idx) => (
                     <div key={idx} className="bg-gray-50 p-3 rounded-2xl border border-gray-100 space-y-1">
                        <input type="text" value={s.value} onChange={e => {
                           const newStats = [...config.about.stats];
                           newStats[idx].value = e.target.value;
                           setConfig({...config, about: {...config.about, stats: newStats}});
                        }} className="w-full text-center font-black text-amber-500 bg-transparent border-none outline-none p-0" />
                        <input type="text" value={s.label} onChange={e => {
                           const newStats = [...config.about.stats];
                           newStats[idx].label = e.target.value;
                           setConfig({...config, about: {...config.about, stats: newStats}});
                        }} className="w-full text-center text-[8px] font-bold uppercase tracking-tighter bg-transparent border-none outline-none p-0 text-gray-400" />
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT & FOOTER */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6 lg:col-span-2">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><MapPin size={20} className="text-amber-500"/> Contato e Rodapé</h3>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Informações Diretas</label>
                  <input type="text" placeholder="Endereço" value={config.contact.address} onChange={e => setConfig({...config, contact: {...config.contact, address: e.target.value}})} className="w-full p-3 border rounded-xl text-sm" />
                  <input type="text" placeholder="WhatsApp (55...)" value={config.contact.whatsapp} onChange={e => setConfig({...config, contact: {...config.contact, whatsapp: e.target.value}})} className="w-full p-3 border rounded-xl text-sm" />
                  <input type="text" placeholder="E-mail" value={config.contact.email} onChange={e => setConfig({...config, contact: {...config.contact, email: e.target.value}})} className="w-full p-3 border rounded-xl text-sm" />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Redes Sociais (Links)</label>
                  <input type="text" placeholder="Instagram URL" value={config.contact.instagram} onChange={e => setConfig({...config, contact: {...config.contact, instagram: e.target.value}})} className="w-full p-3 border rounded-xl text-sm" />
                  <input type="text" placeholder="Facebook URL" value={config.contact.facebook} onChange={e => setConfig({...config, contact: {...config.contact, facebook: e.target.value}})} className="w-full p-3 border rounded-xl text-sm" />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rodapé (Footer)</label>
                  <textarea placeholder="Texto de copyright" value={config.footer.copyright} onChange={e => setConfig({...config, footer: {...config.footer, copyright: e.target.value}})} className="w-full p-3 border rounded-xl text-xs h-16" />
                  <textarea placeholder="Keywords SEO" value={config.footer.seoKeywords} onChange={e => setConfig({...config, footer: {...config.footer, seoKeywords: e.target.value}})} className="w-full p-3 border rounded-xl text-[10px] h-16" />
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ServicesManager = () => {
    const [editing, setEditing] = useState<Partial<Service> | null>(null);

    const save = () => {
      if (!editing) return;
      const newItem = { id: editing.id || Date.now().toString(), title: editing.title || '', description: editing.description || '', icon: editing.icon || 'HardHat' };
      if (editing.id) onUpdate({...data, services: data.services.map(s => s.id === editing.id ? newItem : s)});
      else onUpdate({...data, services: [...data.services, newItem]});
      setEditing(null);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Serviços Oferecidos</h2>
          <button onClick={() => setEditing({ title: '', description: '', icon: 'HardHat' })} className="bg-amber-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-amber-500/20"><Plus size={18}/> Novo Serviço</button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.services.map(s => (
            <div key={s.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 relative shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all">
                 <Briefcase size={20} />
              </div>
              <h4 className="font-bold text-gray-900 leading-tight">{s.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">{s.description}</p>
              <div className="flex gap-2 mt-6 pt-4 border-t border-gray-50">
                <button onClick={() => setEditing(s)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg transition-colors"><Edit3 size={16}/></button>
                <button onClick={() => { if(confirm('Excluir?')) onUpdate({...data, services: data.services.filter(item => item.id !== s.id)}); }} className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
        </div>
        {editing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-md space-y-6 shadow-2xl scale-in">
              <h3 className="font-bold text-2xl text-gray-900">Editar Serviço</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Nome do Serviço" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} className="w-full p-4 border rounded-2xl bg-gray-50 outline-none focus:ring-2 ring-amber-500 font-bold" />
                <textarea placeholder="Pequena descrição para o card..." value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} className="w-full p-4 border rounded-2xl bg-gray-50 h-32 outline-none text-sm" />
                <select value={editing.icon} onChange={e => setEditing({...editing, icon: e.target.value})} className="w-full p-4 border rounded-2xl bg-gray-50 outline-none font-bold">
                  <option value="HardHat">Ícone: Capacete</option>
                  <option value="Pickaxe">Ícone: Picareta</option>
                  <option value="Hammer">Ícone: Martelo</option>
                  <option value="Droplets">Ícone: Água/Drenagem</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button onClick={save} className="flex-1 bg-amber-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600">Salvar Dados</button>
                <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const TestimonialsManager = () => {
    const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);

    const save = () => {
      if (!editing) return;
      const newItem = { id: editing.id || Date.now().toString(), name: editing.name || '', role: editing.role || '', text: editing.text || '', rating: editing.rating || 5 };
      if (editing.id) onUpdate({...data, testimonials: data.testimonials.map(t => t.id === editing.id ? newItem : t)});
      else onUpdate({...data, testimonials: [...data.testimonials, newItem]});
      setEditing(null);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Feedback de Clientes</h2>
          <button onClick={() => setEditing({ name: '', role: '', text: '', rating: 5 })} className="bg-amber-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-amber-500/20"><Plus size={18}/> Novo Depoimento</button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.testimonials.map(t => (
            <div key={t.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex text-amber-400 gap-1 mb-4">
                 {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed h-20 line-clamp-4">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-4 border-t border-gray-50 pt-4">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">{t.role}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(t)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg transition-colors"><Edit3 size={16}/></button>
                  <button onClick={() => { if(confirm('Excluir?')) onUpdate({...data, testimonials: data.testimonials.filter(item => item.id !== t.id)}); }} className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {editing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-md space-y-6 shadow-2xl scale-in">
              <h3 className="font-bold text-2xl text-gray-900">Configurar Depoimento</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Nome Completo" value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} className="w-full p-4 border rounded-2xl bg-gray-50" />
                <input type="text" placeholder="Empresa / Cargo" value={editing.role} onChange={e => setEditing({...editing, role: e.target.value})} className="w-full p-4 border rounded-2xl bg-gray-50" />
                <textarea placeholder="O que o cliente disse?" value={editing.text} onChange={e => setEditing({...editing, text: e.target.value})} className="w-full p-4 border rounded-2xl bg-gray-50 h-32 text-sm italic" />
                <div className="flex items-center gap-4">
                   <label className="text-xs font-bold text-gray-400">Avaliação (1-5)</label>
                   <input type="number" min="1" max="5" value={editing.rating} onChange={e => setEditing({...editing, rating: Number(e.target.value)})} className="w-20 p-2 border rounded-xl" />
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={save} className="flex-1 bg-amber-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-500/20 transition-all">Salvar Feedback</button>
                <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const GalleryManager = () => {
    const [editing, setEditing] = useState<Partial<GalleryItem> | null>(null);

    const save = () => {
      if (!editing) return;
      const newItem = { id: editing.id || Date.now().toString(), url: editing.url || '', type: editing.type || 'image', alt: editing.alt || '' };
      if (editing.id) onUpdate({...data, gallery: data.gallery.map(g => g.id === editing.id ? newItem : g)});
      else onUpdate({...data, gallery: [...data.gallery, newItem]});
      setEditing(null);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && editing) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditing({...editing, url: reader.result as string, type: 'image'});
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Portfolio Multimídia</h2>
            <p className="text-gray-500 text-sm">Organize fotos e vídeos (YouTube) das operações.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEditing({ type: 'image', url: '', alt: '' })} className="bg-amber-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-95"><ImageIcon size={18}/> Add Foto</button>
            <button onClick={() => setEditing({ type: 'video', url: '', alt: '' })} className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"><Video size={18}/> Add Vídeo</button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.gallery.map(g => (
            <div key={g.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm relative group aspect-square flex flex-col">
              <div className="flex-1 overflow-hidden bg-gray-100 flex items-center justify-center">
                {g.type === 'image' ? (
                  <img src={g.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full relative flex items-center justify-center bg-gray-900 text-white">
                    <img 
                      src={`https://img.youtube.com/vi/${g.url.split('v=')[1] || g.url.split('/').pop()}/0.jpg`} 
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <Video size={48} className="relative z-10 opacity-60" />
                    <div className="absolute top-3 right-3 z-10 bg-red-600 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">Video</div>
                  </div>
                )}
              </div>
              <div className="p-3 flex justify-between items-center gap-2 border-t border-gray-50">
                <span className="text-[10px] font-bold text-gray-400 line-clamp-1 truncate flex-1">{g.alt || 'Sem legenda'}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditing(g)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={14}/></button>
                  <button onClick={() => { if(confirm('Excluir?')) onUpdate({...data, gallery: data.gallery.filter(item => item.id !== g.id)}); }} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-md space-y-6 shadow-2xl scale-in">
              <h3 className="font-bold text-2xl text-gray-900">{editing.type === 'image' ? 'Configurar Fotografia' : 'Configurar Link de Vídeo'}</h3>
              <div className="space-y-4">
                <div>
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Legenda da Mídia</label>
                   <input type="text" placeholder="Ex: Obra no Bairro X" value={editing.alt} onChange={e => setEditing({...editing, alt: e.target.value})} className="w-full p-4 border rounded-2xl bg-gray-50" />
                </div>
                {editing.type === 'image' ? (
                  <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-center">
                     {editing.url ? (
                       <img src={editing.url} className="mx-auto h-32 rounded-xl shadow-md mb-4 object-cover" />
                     ) : <ImageIcon size={48} className="mx-auto text-gray-300 mb-2" />}
                     <label className="bg-amber-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-600 transition-all font-bold text-sm block mx-auto w-fit">
                       {editing.url ? 'Trocar Foto' : 'Escolher Foto'}
                       <input type="file" onChange={handleFileUpload} className="hidden" />
                     </label>
                  </div>
                ) : (
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Link YouTube / Vimeo</label>
                    <input type="text" placeholder="Cole a URL do vídeo aqui..." value={editing.url} onChange={e => setEditing({...editing, url: e.target.value})} className="w-full p-4 border rounded-2xl bg-gray-50 text-blue-600 font-mono text-xs" />
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button onClick={save} className="flex-1 bg-amber-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-500/20 transition-all">Salvar na Galeria</button>
                <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const BlogManager = () => {
    const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

    const handleSavePost = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingPost) return;

      const newPost: BlogPost = {
        id: editingPost.id || Date.now().toString(),
        title: editingPost.title || 'Sem Título',
        slug: editingPost.title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-") || 'post',
        excerpt: editingPost.excerpt || '',
        content: editingPost.content || '',
        image: editingPost.image || 'https://images.unsplash.com/photo-1541888941255-081d746fc2c2?auto=format&fit=crop&q=80&w=800',
        date: new Date().toISOString().split('T')[0],
        metaDescription: editingPost.metaDescription || ''
      };

      if (editingPost.id) {
        onUpdate({ ...data, blog: data.blog.map(p => p.id === editingPost.id ? newPost : p) });
      } else {
        onUpdate({ ...data, blog: [newPost, ...data.blog] });
      }
      setEditingPost(null);
    };

    const deletePost = (id: string) => {
      if(confirm('Tem certeza?')) onUpdate({ ...data, blog: data.blog.filter(p => p.id !== id) });
    };

    const handlePostImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && editingPost) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditingPost({ ...editingPost, image: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Blog</h2>
          <button onClick={() => setEditingPost({ title: '', content: '', excerpt: '', image: '' })} className="bg-amber-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-amber-500/20"><Plus size={18}/> Novo Artigo</button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.blog.map(post => (
            <div key={post.id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="h-44 overflow-hidden relative">
                 <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-4 left-4 bg-amber-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Publicado</div>
              </div>
              <div className="p-6 space-y-3">
                <h4 className="font-bold text-gray-900 line-clamp-2 h-12 leading-tight">{post.title}</h4>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{post.date}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingPost(post)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit3 size={16}/></button>
                    <button onClick={() => deletePost(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {editingPost && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-10 space-y-6 shadow-2xl scale-in">
              <h3 className="text-2xl font-bold text-gray-900">Redigir Artigo</h3>
              <form onSubmit={handleSavePost} className="space-y-6">
                <div className="space-y-4">
                   <input type="text" placeholder="Título impactante do artigo" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className="w-full p-4 border rounded-2xl bg-gray-50 text-xl font-bold outline-none focus:ring-2 ring-amber-500" />
                   <textarea placeholder="Resumo para a listagem (Excerpt)..." value={editingPost.excerpt} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} className="w-full p-4 border rounded-2xl bg-gray-50 h-20 outline-none text-sm" />
                   <div className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center">
                      {editingPost.image && <img src={editingPost.image} className="h-32 rounded-xl mb-4 shadow-md" />}
                      <label className="bg-gray-900 text-white px-6 py-2 rounded-xl cursor-pointer font-bold text-sm">
                        Substituir Imagem de Capa
                        <input type="file" onChange={handlePostImage} className="hidden" />
                      </label>
                   </div>
                   <textarea placeholder="Conteúdo do artigo (Suporta HTML)..." rows={12} value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} className="w-full p-6 border rounded-2xl bg-gray-50 font-mono text-sm leading-relaxed" />
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-amber-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-500/20 hover:bg-amber-600">Salvar Postagem</button>
                  <button type="button" onClick={() => setEditingPost(null)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-200">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav />
      <main className="flex-1 ml-64 p-10">
        <Routes>
          <Route path="/" element={
            <div className="space-y-10">
              <div className="flex justify-between items-end">
                 <div>
                    <h2 className="text-3xl font-bold text-gray-900">Dashboard de Controle</h2>
                    <p className="text-gray-500">Gestão integrada Camerini Terraplanagem.</p>
                 </div>
                 <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-xs font-bold border border-green-100 flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    Sistema em Nuvem Online
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <Link to="/admin/leads" className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-4">
                    <Users size={32} />
                  </div>
                  <div className="text-4xl font-black text-gray-900 font-display">{data.leads.length}</div>
                  <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Leads Recebidos</div>
                </Link>
                <Link to="/admin/services" className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
                    <Briefcase size={32} />
                  </div>
                  <div className="text-4xl font-black text-gray-900 font-display">{data.services.length}</div>
                  <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Serviços Ativos</div>
                </Link>
                <Link to="/admin/gallery" className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mb-4">
                    <ImageIcon size={32} />
                  </div>
                  <div className="text-4xl font-black text-gray-900 font-display">{data.gallery.length}</div>
                  <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Arquivos Mídia</div>
                </Link>
                <Link to="/admin/blog" className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-4">
                    <FileText size={32} />
                  </div>
                  <div className="text-4xl font-black text-gray-900 font-display">{data.blog.length}</div>
                  <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Posts no Blog</div>
                </Link>
              </div>

              <div className="bg-gray-900 text-white p-12 rounded-[3rem] relative overflow-hidden shadow-2xl">
                 <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 flex items-center justify-center">
                    <HardHat size={300} className="transform translate-x-1/4" />
                 </div>
                 <div className="relative z-10 space-y-4">
                    <h3 className="text-3xl font-black font-display tracking-tight leading-none">Gestão de Identidade Visual</h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl">Mantenha sua logomarca e imagens principais sempre atualizadas para transmitir profissionalismo aos seus clientes.</p>
                    <Link to="/admin/content" className="inline-flex items-center gap-2 bg-amber-500 text-white font-black px-8 py-4 rounded-2xl hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20 active:scale-95">
                       Configurar Branding <ChevronRight size={18} />
                    </Link>
                 </div>
              </div>
            </div>
          } />
          <Route path="/content" element={<ContentEditor />} />
          <Route path="/services" element={<ServicesManager />} />
          <Route path="/testimonials" element={<TestimonialsManager />} />
          <Route path="/gallery" element={<GalleryManager />} />
          <Route path="/blog" element={<BlogManager />} />
          <Route path="/leads" element={<LeadsView />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
