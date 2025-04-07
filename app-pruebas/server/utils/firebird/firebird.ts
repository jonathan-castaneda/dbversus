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


export { withConnection };