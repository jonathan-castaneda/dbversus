import Firebird from 'node-firebird';

const options = {
  host: 'localhost',
  port: 3051,
  database: '/var/lib/firebird/data/cafeteria.fdb',
  user: 'SYSDBA',
  password: 'masterkey',
  lowercase_keys: false,
  role: null,
  pageSize: 4096,
  retryConnectionInterval: 1000,
  blobAsText: false,
  encoding: 'UTF8',
  wireCrypt: true, 
};

// Función auxiliar para conectarse a la base de datos y ejecutar una consulta
function withConnection() {
  return new Promise((resolve, reject) => {
    Firebird.attach(options, (err, db) => {
      if (err) {
        reject('Error al conectar: ' + err);
      } else {
        resolve(db);
      }
    });
  });
}

// Clase Categorias con métodos findAll y findOne
class categorias {
  static async findAll() {
    try {
      const db = await withConnection();
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM CATEGORIAS', (err, results) => {
          db.detach();
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      throw error;
    }
  }

  static async findOne(id) {
    try {
      const db = await withConnection();
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM CATEGORIAS WHERE ID = ?', [id], (err, results) => {
          db.detach();
          if (err) {
            reject(err);
          } else {
            resolve(results.length > 0 ? results[0] : null);
          }
        });
      });
    } catch (error) {
      console.error('Error al obtener la categoría:', error);
      throw error;
    }
  }

  static async create(id, nombre) {
    try {
      const db = await withConnection();
      return new Promise((resolve, reject) => {
        db.query(
          'INSERT INTO CATEGORIAS (ID, NOMBRE) VALUES (?, ?)',
          [id, nombre],
          (err, result) => {
            db.detach();
            if (err) {
              reject(err);
            } else {
              resolve({ id, nombre });
            }
          }
        );
      });
    } catch (error) {
      console.error("Error al insertar la categoría:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const db = await withConnection();
      return new Promise((resolve, reject) => {
        db.query(
          'DELETE FROM CATEGORIAS WHERE ID = ?',
          [id],
          (err, result) => {
            db.detach();
            if (err) {
              reject(err);
            } else {
              resolve({ message: `Categoría con ID ${id} eliminada` });
            }
          }
        );
      });
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      throw error;
    }
  }

}

export { categorias };