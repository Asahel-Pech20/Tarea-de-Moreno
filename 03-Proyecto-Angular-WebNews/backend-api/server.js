const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'secret-key-webnews-4c';
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

// Función auxiliar para leer base de datos
function readDatabase() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { categorias: [], noticias: [] };
  }
}

// Función auxiliar para guardar base de datos
function writeDatabase(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// 1. ENDPOINT DE AUTENTICACIÓN (LOGIN)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Credenciales por defecto para el proyecto escolar
  if (email === 'admin@webnews.com' && password === 'admin123') {
    const token = jwt.sign({ email, role: 'admin' }, SECRET_KEY, { expiresIn: '8h' });
    return res.json({
      success: true,
      token,
      usuario: { email, nombre: 'Administrador WebNews' }
    });
  }
  return res.status(401).json({ success: false, mensaje: 'Credenciales inválidas (Usa admin@webnews.com / admin123)' });
});

// Middleware opcional para verificar JWT
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ mensaje: 'Token requerido para esta acción' });
  }
  const token = authHeader.replace('Bearer ', '');
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    req.user = decoded;
    next();
  });
}

// 2. CATEGORÍAS
// Obtener todas las categorías
app.get('/api/categories', (req, res) => {
  const db = readDatabase();
  res.json(db.categorias);
});

// Obtener una categoría por ID
app.get('/api/categories/:id', (req, res) => {
  const db = readDatabase();
  const id = parseInt(req.params.id);
  const cat = db.categorias.find(c => c.id === id);
  if (!cat) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
  res.json(cat);
});

// 3. NOTICIAS
// Obtener todas las noticias (con su categoría anidada para facilitar la vista)
app.get('/api/news', (req, res) => {
  const db = readDatabase();
  const newsWithCategory = db.noticias.map(n => {
    const categoria = db.categorias.find(c => c.id === n.categoria_id) || null;
    return { ...n, categoria };
  });
  res.json(newsWithCategory);
});

// Obtener una noticia por ID
app.get('/api/news/:id', (req, res) => {
  const db = readDatabase();
  const id = parseInt(req.params.id);
  const noticia = db.noticias.find(n => n.id === id);
  if (!noticia) return res.status(404).json({ mensaje: 'Noticia no encontrada' });
  const categoria = db.categorias.find(c => c.id === noticia.categoria_id) || null;
  res.json({ ...noticia, categoria });
});

// Crear una noticia
app.post('/api/news', (req, res) => {
  const db = readDatabase();
  const nuevaNoticia = {
    id: db.noticias.length > 0 ? Math.max(...db.noticias.map(n => n.id)) + 1 : 1,
    titulo: req.body.titulo || 'Sin título',
    descripcion: req.body.descripcion || '',
    categoria_id: parseInt(req.body.categoria_id) || 1,
    fecha_publicacion: req.body.fecha_publicacion || new Date().toISOString(),
    imagen: req.body.imagen || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=60',
    UserAlta: req.body.UserAlta || 'Admin'
  };

  db.noticias.push(nuevaNoticia);
  writeDatabase(db);

  const categoria = db.categorias.find(c => c.id === nuevaNoticia.categoria_id) || null;
  res.status(201).json({ ...nuevaNoticia, categoria });
});

// Actualizar una noticia existente
app.put('/api/news/:id', (req, res) => {
  const db = readDatabase();
  const id = parseInt(req.params.id);
  const index = db.noticias.findIndex(n => n.id === id);
  if (index === -1) return res.status(404).json({ mensaje: 'Noticia no encontrada' });

  db.noticias[index] = {
    ...db.noticias[index],
    ...req.body,
    id: id, // Evitar cambiar ID
    categoria_id: parseInt(req.body.categoria_id || db.noticias[index].categoria_id),
    FechaMod: new Date().toISOString()
  };

  writeDatabase(db);
  const categoria = db.categorias.find(c => c.id === db.noticias[index].categoria_id) || null;
  res.json({ ...db.noticias[index], categoria });
});

// Eliminar una noticia
app.delete('/api/news/:id', (req, res) => {
  const db = readDatabase();
  const id = parseInt(req.params.id);
  const existe = db.noticias.some(n => n.id === id);
  if (!existe) return res.status(404).json({ mensaje: 'Noticia no encontrada' });

  db.noticias = db.noticias.filter(n => n.id !== id);
  writeDatabase(db);
  res.json({ success: true, mensaje: 'Noticia eliminada correctamente' });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  SERVIDOR REST API "ApiNews" INICIADO`);
  console.log(`  URL Base: http://localhost:${PORT}/api`);
  console.log(`  Endpoints disponibles:`);
  console.log(`   - POST /api/login`);
  console.log(`   - GET  /api/categories`);
  console.log(`   - GET  /api/categories/:id`);
  console.log(`   - GET  /api/news`);
  console.log(`   - POST /api/news`);
  console.log(`   - PUT  /api/news/:id`);
  console.log(`   - DEL  /api/news/:id`);
  console.log(`====================================================`);
});
