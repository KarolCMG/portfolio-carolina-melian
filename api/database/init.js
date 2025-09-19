const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear conexión a la base de datos
const dbPath = path.join(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath);

// Función para inicializar la base de datos
function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Tabla de contactos
      db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          subject TEXT,
          message TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          ip_address TEXT,
          user_agent TEXT
        )
      `, (err) => {
        if (err) {
          console.error('Error creando tabla contacts:', err);
          reject(err);
        } else {
          console.log('✅ Tabla contacts creada/verificada');
        }
      });

      // Tabla de usuarios (para autenticación)
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          role TEXT DEFAULT 'user',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          last_login DATETIME
        )
      `, (err) => {
        if (err) {
          console.error('Error creando tabla users:', err);
          reject(err);
        } else {
          console.log('✅ Tabla users creada/verificada');
        }
      });

      // Tabla de logs de seguridad
      db.run(`
        CREATE TABLE IF NOT EXISTS security_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          event_type TEXT NOT NULL,
          ip_address TEXT,
          user_agent TEXT,
          details TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creando tabla security_logs:', err);
          reject(err);
        } else {
          console.log('✅ Tabla security_logs creada/verificada');
          resolve();
        }
      });
    });
  });
}

// Función para obtener la instancia de la base de datos
function getDatabase() {
  return db;
}

// Función para cerrar la conexión
function closeDatabase() {
  return new Promise((resolve) => {
    db.close((err) => {
      if (err) {
        console.error('Error cerrando base de datos:', err);
      } else {
        console.log('✅ Conexión a base de datos cerrada');
      }
      resolve();
    });
  });
}

module.exports = {
  initDatabase,
  getDatabase,
  closeDatabase
};

