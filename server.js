
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Caminhos absolutos garantidos
const DIST_PATH = path.resolve(__dirname, 'dist');
const DATA_FILE = path.resolve(__dirname, 'data.json');

console.log('--- Camerini Server Startup ---');
console.log('Port:', PORT);
console.log('Dist Path:', DIST_PATH);
console.log('Data File:', DATA_FILE);

// Middleware
app.use(express.json({ limit: '50mb' }));

// Inicialização segura do banco de dados (JSON)
try {
  if (!fs.existsSync(DATA_FILE)) {
    console.log('Initial data.json not found. Creating...');
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
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf8');
    console.log('data.json created successfully.');
  }
} catch (err) {
  console.error('CRITICAL: Failed to initialize data.json:', err.message);
}

// Rotas de API
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
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('API Post Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Arquivos Estáticos - Verifica se a pasta existe para não quebrar o Express
if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH));
} else {
  console.warn('WARNING: Dist directory not found at:', DIST_PATH);
}

// Fallback SPA - Corrigido para ser compatível com todas as versões do Express
app.get('*', (req, res) => {
  // Evita loops infinitos ou servir HTML para assets perdidos
  if (req.path.includes('.')) {
    return res.status(404).send('Asset not found');
  }

  const indexPath = path.resolve(DIST_PATH, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Camerini Server Online - Building frontend... Aguarde alguns instantes e atualize a página.');
  }
});

// Listen em 0.0.0.0 é obrigatório para Docker
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`>>> Server running on http://0.0.0.0:${PORT}`);
});
