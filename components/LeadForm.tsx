
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Lead } from '../types';

interface LeadFormProps {
  onAddLead: (lead: Lead) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onAddLead }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const formatWhatsApp = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').substring(0, 15);
    }
    return cleaned;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const internationalFormat = `+55${whatsapp.replace(/\D/g, '')}`;
    
    onAddLead({
      id: Date.now().toString(),
      name,
      whatsapp: internationalFormat,
      date: new Date().toISOString()
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setWhatsapp('');
    }, 5000);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center space-y-4 animate-in fade-in duration-500">
        <CheckCircle2 className="mx-auto text-green-500" size={48} />
        <h3 className="text-xl font-bold text-green-900">Mensagem Enviada!</h3>
        <p className="text-green-700">Entraremos em contato via WhatsApp em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Peça seu Orçamento</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: João Silva"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
        <input
          required
          type="text"
          value={whatsapp}
          onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
          placeholder="(00) 00000-0000"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg"
      >
        <span>Solicitar Agora</span>
        <Send size={18} />
      </button>
      <p className="text-center text-xs text-gray-400">Prometemos não enviar spam.</p>
    </form>
  );
};

export default LeadForm;
