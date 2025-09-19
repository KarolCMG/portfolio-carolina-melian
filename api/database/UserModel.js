const { getDatabase } = require('./init');
const bcrypt = require('bcryptjs');

class UserModel {
  constructor() {
    this.db = getDatabase();
  }

  // Crear un nuevo usuario
  async create(userData) {
    const { username, password, email, role = 'user' } = userData;
    
    // Hash de la contraseña
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO users (username, password_hash, email, role)
        VALUES (?, ?, ?, ?)
      `;
      
      this.db.run(sql, [username, password_hash, email, role], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            username,
            email,
            role,
            created_at: new Date().toISOString()
          });
        }
      });
    });
  }

  // Buscar usuario por username
  findByUsername(username) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE username = ?';
      
      this.db.get(sql, [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Buscar usuario por email
  findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?';
      
      this.db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Verificar contraseña
  async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  // Actualizar último login
  updateLastLogin(username) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE username = ?';
      
      this.db.run(sql, [username], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  // Obtener todos los usuarios
  getAll() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id, username, email, role, created_at, last_login
        FROM users
        ORDER BY created_at DESC
      `;
      
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Eliminar usuario
  delete(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM users WHERE id = ?';
      
      this.db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }
}

module.exports = UserModel;

