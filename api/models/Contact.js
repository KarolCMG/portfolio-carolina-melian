const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Contact {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '../database/contacts.db'));
    this.initDatabase();
  }

  initDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        ip TEXT,
        userAgent TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creando tabla:', err);
      } else {
        console.log('✅ Base de datos de contactos inicializada');
      }
    });
  }

  async create(contactData) {
    return new Promise((resolve, reject) => {
      const { name, email, subject, message, ip, userAgent } = contactData;
      
      const query = `
        INSERT INTO contacts (name, email, subject, message, ip, userAgent)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      this.db.run(query, [name, email, subject, message, ip, userAgent], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            name,
            email,
            subject,
            message,
            ip,
            userAgent,
            createdAt: new Date().toISOString()
          });
        }
      });
    });
  }

  async findAll(options = {}) {
    return new Promise((resolve, reject) => {
      const { limit = 10, offset = 0, order = [['createdAt', 'DESC']] } = options;
      
      // Contar total
      this.db.get('SELECT COUNT(*) as total FROM contacts', (err, countResult) => {
        if (err) {
          reject(err);
          return;
        }
        
        const total = countResult.total;
        
        // Obtener contactos
        const query = `
          SELECT * FROM contacts 
          ORDER BY createdAt DESC 
          LIMIT ? OFFSET ?
        `;
        
        this.db.all(query, [limit, offset], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              contacts: rows,
              total
            });
          }
        });
      });
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM contacts WHERE id = ?';
      
      this.db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM contacts WHERE id = ?';
      
      this.db.run(query, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  async update(id, updateData) {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];
      
      Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
          fields.push(`${key} = ?`);
          values.push(updateData[key]);
        }
      });
      
      if (fields.length === 0) {
        resolve(false);
        return;
      }
      
      fields.push('updatedAt = CURRENT_TIMESTAMP');
      values.push(id);
      
      const query = `UPDATE contacts SET ${fields.join(', ')} WHERE id = ?`;
      
      this.db.run(query, values, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  async getStats() {
    return new Promise((resolve, reject) => {
      const queries = [
        'SELECT COUNT(*) as total FROM contacts',
        'SELECT COUNT(*) as today FROM contacts WHERE DATE(createdAt) = DATE("now")',
        'SELECT COUNT(*) as thisWeek FROM contacts WHERE DATE(createdAt) >= DATE("now", "-7 days")',
        'SELECT COUNT(*) as thisMonth FROM contacts WHERE DATE(createdAt) >= DATE("now", "-30 days")'
      ];
      
      Promise.all(queries.map(query => 
        new Promise((resolve, reject) => {
          this.db.get(query, (err, row) => {
            if (err) reject(err);
            else resolve(Object.values(row)[0]);
          });
        })
      )).then(([total, today, thisWeek, thisMonth]) => {
        resolve({ total, today, thisWeek, thisMonth });
      }).catch(reject);
    });
  }

  close() {
    this.db.close();
  }
}

module.exports = new Contact();


