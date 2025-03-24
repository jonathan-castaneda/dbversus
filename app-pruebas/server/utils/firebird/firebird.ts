import Firebird from 'node-firebird';

const options = {
  host: 'localhost',
  port: 3051,
  database: '/var/lib/firebird/data/cafeteria.fdb',
  user: 'SYSDBA',
  password: 'masterkey',
  authPlugins: ['Legacy_Auth'], // 👈 Forzamos autenticación heredada
};

// Función auxiliar para conectarse a la base de datos y ejecutar una consulta
function withConnection() {
  return new Promise((resolve, reject) => {
    Firebird.attach(options, (err, db) => {
      if (err) {
        reject('Error al conectar: ' + err);  // Si hay un error de conexión, lo rechazamos
      } else {
        resolve(db);  // Si la conexión es exitosa, la pasamos al siguiente paso
      }
    });
  });
}

// Clase Categorias con método findAll que obtiene todas las categorías
class categorias {
  static async findAll() {
    try {
      const db = await withConnection();  // Esperamos la conexión
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM CATEGORIAS', (err, results) => {  // Ejecutamos la consulta para obtener las categorías
          db.detach();  // Desconectamos la base de datos después de la consulta
          if (err) {
            reject(err);  // Si hay un error con la consulta, lo rechazamos
          } else {
            resolve(results);  // Si la consulta es exitosa, devolvemos los resultados
          }
        });
      });
    } catch (error) {
      console.error('Error al obtener las categorías:', error);  // Si hay algún error en la conexión, lo capturamos
      throw error;  // Lanza el error para que lo maneje el código que llama a findAll
    }
  }
}

// Exportamos la clase categorias para usarla en otros archivos
export { categorias };

