const { initDatabase } = require('./init');
const ContactModel = require('./ContactModel');
const UserModel = require('./UserModel');
const SecurityLogModel = require('./SecurityLogModel');
require('dotenv').config();

async function testDatabase() {
  try {
    console.log('🚀 Inicializando base de datos...');
    await initDatabase();
    
    console.log('📊 Probando modelos de base de datos...\n');
    
    // Probar ContactModel
    console.log('1️⃣ Probando ContactModel...');
    const contactModel = new ContactModel();
    
    const testContact = await contactModel.create({
      name: 'Usuario de Prueba',
      email: 'test@ejemplo.com',
      subject: 'Mensaje de prueba',
      message: 'Este es un mensaje de prueba para verificar que la base de datos funciona correctamente.',
      ip_address: '127.0.0.1',
      user_agent: 'Test Agent'
    });
    
    console.log('✅ Contacto creado:', testContact);
    
    const contacts = await contactModel.getAll(5);
    console.log('✅ Contactos obtenidos:', contacts.length);
    
    const totalContacts = await contactModel.count();
    console.log('✅ Total de contactos:', totalContacts);
    
    // Probar UserModel
    console.log('\n2️⃣ Probando UserModel...');
    const userModel = new UserModel();
    
    const users = await userModel.getAll();
    console.log('✅ Usuarios obtenidos:', users.length);
    
    // Probar SecurityLogModel
    console.log('\n3️⃣ Probando SecurityLogModel...');
    const securityLogModel = new SecurityLogModel();
    
    const testLog = await securityLogModel.create({
      event_type: 'test_event',
      ip_address: '127.0.0.1',
      user_agent: 'Test Agent',
      details: 'Evento de prueba de la base de datos'
    });
    
    console.log('✅ Log de seguridad creado:', testLog);
    
    const logs = await securityLogModel.getAll(5);
    console.log('✅ Logs obtenidos:', logs.length);
    
    console.log('\n🎉 ¡Todas las pruebas de base de datos pasaron exitosamente!');
    
  } catch (error) {
    console.error('❌ Error en las pruebas de base de datos:', error);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  testDatabase()
    .then(() => {
      console.log('✅ Proceso completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error fatal:', error);
      process.exit(1);
    });
}

module.exports = testDatabase;
