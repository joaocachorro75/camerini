
import { AppData } from './types.ts';

const INITIAL_DATA: AppData = {
  config: {
    logo: 'https://images.unsplash.com/photo-1541888941255-081d746fc2c2?auto=format&fit=crop&q=80&w=400',
    hero: {
      title: 'Excelência em Terraplanagem e Infraestrutura',
      subtitle: 'Transformamos terrenos em bases sólidas para o seu projeto. Mais de 20 anos de experiência com tecnologia de ponta.',
      cta: 'Solicitar Orçamento Grátis',
      bgImage: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=1920'
    },
    about: {
      sectionTag: 'Sobre a Camerini',
      title: 'Soluções Robustas para Grandes Desafios',
      text: 'A Camerini Terraplanagem é referência em soluções de movimentação de terra, oferecendo serviços com agilidade, segurança e precisão técnica. Nosso compromisso é com a qualidade final e a satisfação total de nossos parceiros em cada m² trabalhado.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
      stats: [
        { label: 'Obras Entregues', value: '+500' },
        { label: 'Anos de Experiência', value: '20+' },
        { label: 'Equipamentos Próprios', value: '30+' }
      ]
    },
    servicesHeader: {
      tag: 'Nossos Serviços',
      title: 'Soluções completas para seu projeto'
    },
    contact: {
      address: 'São Paulo e Grande SP - Atendimento Nacional',
      phone: '(11) 99999-9999',
      email: 'contato@camerini.com.br',
      whatsapp: '5511999999999',
      instagram: 'https://instagram.com/cameriniterrplanagem',
      facebook: 'https://facebook.com/cameriniterrplanagem'
    },
    footer: {
      description: 'Pronto para começar seu projeto com segurança? Não importa o tamanho da obra, nós temos a estrutura para atender com excelência.',
      copyright: '© 2024 Camerini Terraplanagem. Todos os direitos reservados.',
      seoKeywords: 'Terraplanagem em São Paulo | Escavação | Nivelamento de Terrenos | Infraestrutura Urbana'
    },
    seo: {
      title: 'Camerini Terraplanagem | Escavação, Nivelamento e Infraestrutura',
      description: 'Líder em terraplanagem e escavação. Atendemos projetos residenciais, comerciais e industriais com precisão e equipamentos modernos.',
      ogImage: 'https://images.unsplash.com/photo-1541888941255-081d746fc2c2?auto=format&fit=crop&q=80&w=1200'
    }
  },
  services: [
    { id: '1', title: 'Terraplanagem', description: 'Preparação completa de terrenos com nivelamento a laser.', icon: 'HardHat' },
    { id: '2', title: 'Escavação', description: 'Escavações precisas para fundações e subsolos.', icon: 'Pickaxe' },
    { id: '3', title: 'Demolição', description: 'Demolição técnica controlada com remoção de resíduos.', icon: 'Hammer' },
    { id: '4', title: 'Drenagem', description: 'Sistemas eficientes de escoamento de águas pluviais.', icon: 'Droplets' }
  ],
  testimonials: [
    { id: '1', name: 'Ricardo Almeida', role: 'Diretor de Operações', text: 'A Camerini é nossa parceira estratégica. Cumprem prazos rigorosos.', rating: 5 },
    { id: '2', name: 'Cláudia Santos', role: 'Arquiteta', text: 'O nivelamento feito no meu último projeto foi perfeito.', rating: 5 }
  ],
  blog: [],
  leads: [],
  gallery: []
};

export const db = {
  get: async (): Promise<AppData> => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('API indisponível');
      return await response.json();
    } catch (error) {
      console.warn('Usando dados locais:', error);
      const local = localStorage.getItem('camerini_fallback');
      return local ? JSON.parse(local) : INITIAL_DATA;
    }
  },
  save: async (data: AppData) => {
    try {
      localStorage.setItem('camerini_fallback', JSON.stringify(data));
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Erro ao salvar no servidor:', error);
    }
  }
};
