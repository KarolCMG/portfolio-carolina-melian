const { getDatabase } = require('./init');

class SecurityLogModel {
  constructor() {
    this.db = getDatabase();
  }

  // Crear un nuevo log de seguridad
  create(logData) {
    return new Promise((resolve, reject) => {
      const { event_type, ip_address, user_agent, details } = logData;
      
      const sql = `
        INSERT INTO security_logs (event_type, ip_address, user_agent, details)
        VALUES (?, ?, ?, ?)
      `;
      
      this.db.run(sql, [event_type, ip_address, user_agent, details], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            event_type,
            ip_address,
            user_agent,
            details,
            created_at: new Date().toISOString()
          });
        }
      });
    });
  }

  // Obtener logs por tipo de evento
  getByEventType(event_type, limit = 100) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM security_logs
        WHERE event_type = ?
        ORDER BY created_at DESC
        LIMIT ?
      `;
      
      this.db.all(sql, [event_type, limit], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Obtener logs por IP
  getByIP(ip_address, limit = 50) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM security_logs
        WHERE ip_address = ?
        ORDER BY created_at DESC
        LIMIT ?
      `;
      
      this.db.all(sql, [ip_address, limit], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Obtener todos los logs (con paginación)
  getAll(limit = 100, offset = 0) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM security_logs
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

  // Contar logs por tipo de evento
  countByEventType(event_type) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT COUNT(*) as total FROM security_logs WHERE event_type = ?';
      
      this.db.get(sql, [event_type], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.total);
        }
      });
    });
  }

  // Eliminar logs antiguos (más de 30 días)
  deleteOldLogs() {
    return new Promise((resolve, reject) => {
      const sql = `
        DELETE FROM security_logs
        WHERE created_at < datetime('now', '-30 days')
      `;
      
      this.db.run(sql, [], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
}

module.exports = SecurityLogModel;

