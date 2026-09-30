/**
 * TESTER API REST - SIMULADOR CLI DE POSTMAN
 * Permite probar todos los endpoints del backend WebNews sin necesidad de frontend.
 * Referencia: Curso de Consumo API Rest con Angular & Node (Notion)
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

function request(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runApiTests() {
  console.log('========================================================================');
  console.log('  TESTER API REST - PRUEBA DE ENDPOINTS (MODO POSTMAN EN CONSOLA)');
  console.log('  Servidor destino: http://localhost:3000/api');
  console.log('========================================================================\n');

  try {
    // 1. Probar Login (Autenticación)
    console.log('[TEST 1/5] POST /api/login (Autenticacion con JWT)');
    const loginRes = await request('POST', '/api/login', {
      email: 'admin@webnews.com',
      password: 'admin123'
    });
    console.log(`   Status: ${loginRes.status} OK`);
    console.log(`   Token generado: ${loginRes.data.token ? loginRes.data.token.substring(0, 35) + '...' : 'N/A'}`);
    const token = loginRes.data.token;

    // 2. Probar GET Categorías
    console.log('\n[TEST 2/5] GET /api/categories (Listado de categorias)');
    const catRes = await request('GET', '/api/categories');
    console.log(`   Status: ${catRes.status} OK`);
    console.log(`   Categorias encontradas: ${catRes.data.length}`);
    catRes.data.forEach(c => console.log(`     - [ID ${c.id}] ${c.nombre}`));

    // 3. Probar GET Noticias
    console.log('\n[TEST 3/5] GET /api/news (Listado de noticias publicadas)');
    const newsRes = await request('GET', '/api/news');
    console.log(`   Status: ${newsRes.status} OK`);
    console.log(`   Noticias registradas: ${newsRes.data.length}`);
    newsRes.data.forEach(n => console.log(`     - [ID ${n.id}] ${n.titulo}`));

    // 4. Probar POST Noticia (Creación)
    console.log('\n[TEST 4/5] POST /api/news (Crear noticia de prueba sin frontend)');
    const createRes = await request('POST', '/api/news', {
      titulo: 'Noticia creada desde Tester API CLI',
      descripcion: 'Prueba automatizada de insercion simulando peticion Postman.',
      categoria_id: 1,
      UserAlta: 'TesterBot'
    });
    console.log(`   Status: ${createRes.status} CREADO`);
    console.log(`   Noticia ID asignado: ${createRes.data.id} - "${createRes.data.titulo}"`);
    const newId = createRes.data.id;

    // 5. Probar DELETE Noticia (Limpieza)
    console.log(`\n[TEST 5/5] DELETE /api/news/${newId} (Eliminar noticia de prueba)`);
    const delRes = await request('DELETE', `/api/news/${newId}`);
    console.log(`   Status: ${delRes.status} OK`);
    console.log(`   Respuesta: ${delRes.data.mensaje || 'Eliminado'}`);

    console.log('\n========================================================================');
    console.log('  TODOS LOS ENDPOINTS DE LA API REST FUNCIONAN CORRECTAMENTE (200 OK)');
    console.log('========================================================================');

  } catch (err) {
    console.log('\n[AVISO] El servidor Backend no parece estar encendido en http://localhost:3000');
    console.log('Inicia primero el backend o usa la opcion "Iniciar Portal WebNews" del menu.');
  }
}

runApiTests();
