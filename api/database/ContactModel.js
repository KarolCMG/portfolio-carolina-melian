const { getDatabase } = require('./init');

class ContactModel {
  constructor() {
    this.db = getDatabase();
  }

  // Crear un nuevo contacto
  create(contactData) {
    return new Promise((resolve, reject) => {
      const { name, email, subject, message, ip_address, user_agent } = contactData;
      
      const sql = `
        INSERT INTO contacts (name, email, subject, message, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      this.db.run(sql, [name, email, subject, message, ip_address, user_agent], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            name,
            email,
            subject,
            message,
            created_at: new Date().toISOString()
          });
        }
      });
    });
  }

  // Obtener todos los contactos (con paginación)
  getAll(limit = 50, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id, name, email, subject, message, created_at, ip_address
        FROM contacts
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `;
      
      this.db.all(sql, [limit, offset], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Obtener un contacto por ID
  getById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM contacts WHERE id = ?';
      
      this.db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Contar total de contactos
  count() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT COUNT(*) as total FROM contacts';
      
      this.db.get(sql, [], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.total);
        }
      });
    });
  }

  // Eliminar un contacto
  delete(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM contacts WHERE id = ?';
      
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

module.exports = ContactModel;

