
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware para JSON
app.use(express.json({ limit: '50mb' }));

// Inicializa banco de dados se não existir
if (!fs.existsSync(DATA_FILE)) {
  const initialData = {
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
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// 1. Servir arquivos estáticos (prioridade máxima)
app.use(express.static(path.join(__dirname, 'dist')));

// 2. Rotas de API
app.get('/api/data', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler dados' });
  }
});

app.post('/api/data', (req, res) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Fallback para SPA (Mudar para '*' sem barra para evitar PathError)
// Adicionamos uma verificação simples: se a requisição parece ser para um arquivo (tem ponto), não manda o index.html
app.get('*', (req, res) => {
  if (req.path.includes('.') && !req.path.endsWith('.html')) {
    return res.status(404).end();
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Inicialização
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
