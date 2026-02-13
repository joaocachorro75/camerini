
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const DIST_PATH = path.join(__dirname, 'dist');

// Middleware para JSON com limite aumentado
app.use(express.json({ limit: '50mb' }));

// Inicialização segura do arquivo de dados
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

// 1. Servir arquivos estáticos do diretório dist
app.use(express.static(DIST_PATH));

// 2. Rotas de API (Processadas antes do fallback de SPA)
app.use('/api', (req, res, next) => {
  if (req.path === '/data') {
    if (req.method === 'GET') {
      try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return res.json(JSON.parse(data));
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao ler dados' });
      }
    }
    if (req.method === 'POST') {
      try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
        return res.json({ success: true });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  next();
});

// 3. Fallback de SPA (Ultra compatível)
// Não usamos app.get('*') para evitar erro de parsing de string de rota.
// Usamos um middleware final que captura qualquer requisição que sobrou.
app.use((req, res) => {
  // Se a requisição for para um arquivo (tem ponto no nome) e não foi encontrada pelo static, retornamos 404 real
  // Isso evita o erro de "página em branco" onde o browser tenta ler o index.html como se fosse um arquivo .js ou .css
  if (req.path.includes('.') && !req.path.endsWith('.html')) {
    return res.status(404).end();
  }
  
  // Para rotas de navegação do React (ex: /admin, /blog), enviamos o index.html
  res.sendFile(path.join(DIST_PATH, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Arquivo index.html não encontrado no diretório dist. Verifique o build.');
    }
  });
});

// Inicia o servidor escutando em 0.0.0.0 (Obrigatório para Docker/Easypanel)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Camerini Server Online na porta ${PORT}`);
});
