const axios = require('axios');

const API_BASE = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Probando Portfolio API...\n');

  try {
    // 1. Health Check
    console.log('1. ✅ Health Check');
    const healthResponse = await axios.get(`${API_BASE}/api/health`);
    console.log('   Status:', healthResponse.data.status);
    console.log('   Message:', healthResponse.data.message);
    console.log('');

    // 2. Enviar mensaje de contacto
    console.log('2. 📧 Enviar mensaje de contacto');
    const contactData = {
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      subject: 'Consulta sobre proyecto',
      message: 'Hola Carolina, me interesa trabajar contigo en un proyecto de React. ¿Podrías contactarme?'
    };

    const contactResponse = await axios.post(`${API_BASE}/api/contact`, contactData);
    console.log('   Status:', contactResponse.status);
    console.log('   Success:', contactResponse.data.success);
    console.log('   Message:', contactResponse.data.message);
    console.log('');

    // 3. Login
    console.log('3. 🔐 Login');
    const loginData = {
      username: 'admin',
      password: 'admin123'
    };

    const loginResponse = await axios.post(`${API_BASE}/api/auth/login`, loginData);
    console.log('   Status:', loginResponse.status);
    console.log('   Success:', loginResponse.data.success);
    console.log('   Token:', loginResponse.data.token ? '✅ Generado' : '❌ Error');
    console.log('');

    // 4. Obtener mensajes (con token)
    console.log('4. 📋 Obtener mensajes de contacto');
    const token = loginResponse.data.token;
    const messagesResponse = await axios.get(`${API_BASE}/api/contact`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('   Status:', messagesResponse.status);
    console.log('   Success:', messagesResponse.data.success);
    console.log('   Total mensajes:', messagesResponse.data.pagination.total);
    console.log('');

    console.log('🎉 ¡Todas las pruebas pasaron correctamente!');
    console.log('📚 Documentación disponible en: http://localhost:3001/api-docs');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.response?.data || error.message);
  }
}

// Ejecutar pruebas
testAPI();


