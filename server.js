
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.resolve(__dirname, 'data.json');

// Middleware para JSON
app.use(express.json({ limit: '50mb' }));

// Health Check
app.get('/health', (req, res) => res.status(200).send('OK'));

// MIDDLEWARE DE TRANSPILAÇÃO (Resolve o erro da página em branco)
app.get(/\.(tsx|ts)$/, async (req, res) => {
  const filePath = path.join(__dirname, req.path);
  if (!fs.existsSync(filePath)) return res.status(404).send('File not found');

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const result = await esbuild.transform(content, {
      loader: req.path.endsWith('tsx') ? 'tsx' : 'ts',
      format: 'esm',
      target: 'es2020',
      sourcemap: 'inline',
    });
    
    res.set('Content-Type', 'application/javascript');
    res.send(result.code);
  } catch (error) {
    console.error('Transpilation error:', error);
    res.status(500).send(`Error transpiling ${req.path}: ${error.message}`);
  }
});

// Banco de dados JSON
const initData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = { config: {}, services: [], testimonials: [], blog: [], leads: [], gallery: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
};
initData();

app.get('/api/data', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/data', (req, res) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Arquivos estáticos tradicionais
app.use(express.static(__dirname));

// Fallback para SPA
app.get('*', (req, res) => {
  if (req.path.includes('.')) return res.status(404).send('Not found');
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`>>> Camerini Server Running on 0.0.0.0:${PORT}`);
});
