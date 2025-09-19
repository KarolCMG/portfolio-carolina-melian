const { initDatabase } = require('./init');
const UserModel = require('./UserModel');
require('dotenv').config();

async function createAdminUser() {
  try {
    console.log('🚀 Inicializando base de datos...');
    await initDatabase();
    
    console.log('👤 Creando usuario administrador...');
    const userModel = new UserModel();
    
    // Verificar si ya existe un admin
    const existingAdmin = await userModel.findByUsername(process.env.ADMIN_USERNAME || 'admin');
    
    if (existingAdmin) {
      console.log('✅ Usuario administrador ya existe');
      return;
    }
    
    // Crear usuario admin
    const adminUser = await userModel.create({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      role: 'admin'
    });
    
    console.log('✅ Usuario administrador creado exitosamente:');
    console.log(`   Username: ${adminUser.username}`);
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Role: ${adminUser.role}`);
    console.log(`   ID: ${adminUser.id}`);
    
  } catch (error) {
    console.error('❌ Error creando usuario administrador:', error);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createAdminUser()
    .then(() => {
      console.log('🎉 Proceso completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error fatal:', error);
      process.exit(1);
    });
}

module.exports = createAdminUser;
