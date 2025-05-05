import { Sequelize, DataTypes } from "sequelize";

// Variable de entorno HOST_DB indica la IP o el nombre del servidor DB SQL Server
let hostdb = process.env.HOST_DB || 'localhost';

// Configuración de Sequelize para SQL Server
const sequelizeSqlServer = new Sequelize({
  dialect: 'mssql', // Dialecto para SQL Server
  database: 'cafeteria', // Nombre de la base de datos
  username: 'sa', // Usuario de SQL Server
  password: 'TuPasswordFuerte123', // Contraseña de SQL Server
  host: hostdb, // Host del servidor (localhost por defecto)
  port: 1433, // Puerto predeterminado para SQL Server
  dialectOptions: {
      encrypt: true, // Encriptar conexión (útil para Azure SQL)
      enableArithAbort: true // Control de abortos aritméticos
  }
});


// Tabla Categorías
const categoriasSqlServer = sequelize.define('categorias', {
    id: { type: DataTypes.INTEGER, primaryKey: true }, // Cambiado a INTEGER para SQL Server
    nombre: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: false // No se crean campos createdAt ni updateAt
});

// Tabla Productos
const productosSqlServer = sequelize.define('productos', {
    id: { type: DataTypes.INTEGER, primaryKey: true }, // Cambiado a INTEGER
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Cambiado a DECIMAL con precisión
    idCategoria: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false // No se crean campos createdAt ni updateAt
});

// Tabla Órdenes
const ordenesSqlServer = sequelize.define('ordenes', {
    id: { type: DataTypes.INTEGER, primaryKey: true }, // Cambiado a INTEGER
    fecha: { type: DataTypes.DATEONLY, allowNull: false }, // DATEONLY es compatible con SQL Server
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Cambiado a DECIMAL con precisión
}, {
    timestamps: false // No se crean campos createdAt ni updateAt
});

// Tabla Detalle Órdenes
const detalleordenesSqlServer = sequelize.define('detalleordenes', {
    idorden: { type: DataTypes.INTEGER, primaryKey: true }, // Cambiado a INTEGER
    idproducto: { type: DataTypes.INTEGER, primaryKey: true }, // Cambiado a INTEGER
    cantidad: { type: DataTypes.INTEGER, allowNull: false }, // Cambiado a INTEGER
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Cambiado a DECIMAL con precisión
}, {
    timestamps: false // No se crean campos createdAt ni updateAt
});

// Asociaciones o Relaciones entre las tablas
ordenesSqlServer.hasMany(detalleordenesSqlServer, { foreignKey: 'idorden' });
detalleordenesSqlServer.belongsTo(ordenesSqlServer, { foreignKey: 'idorden' });

productosSqlServer.hasMany(detalleordenesSqlServer, { foreignKey: 'idproducto' });
detalleordenesSqlServer.belongsTo(productosSqlServer, { foreignKey: 'idproducto' });

categoriasSqlServer.hasMany(productosSqlServer, { foreignKey: 'idCategoria' });
productosSqlServer.belongsTo(categoriasSqlServer, { foreignKey: 'idCategoria' });

// Exportamos los modelos y Sequelize
const db = {
    sequelizeSqlServer,
    categoriasSqlServer,
    productosSqlServer,
    ordenesSqlServer,
    detalleordenesSqlServer
};

export { sequelizeSqlServer, categoriasSqlServer, productosSqlServer, ordenesSqlServer, detalleordenesSqlServer };
