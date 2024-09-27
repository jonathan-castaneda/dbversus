import { Sequelize, DataTypes } from "sequelize";

//const sequelize = new Sequelize('');
//declaro sequelize configurada para conectarse a una base de datos de mysql con usuario root y sin contraseña

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'cafeteria',
    username: 'root',
    password: '',
    host: 'localhost',
    port: 3306
});
// Tabla Categorias
const categorias = sequelize.define('categorias', 
{
  id: { type: DataTypes.NUMBER, primaryKey: true},
  nombre: { type: DataTypes.STRING , allowNull: false},
}, 
{
  timestamps: false //no crea campos createdAt ni updateAt
});

//tabla productos
const productos = sequelize.define('productos', 
{
  id: { type: DataTypes.NUMBER, primaryKey: true},
  nombre: { type: DataTypes.STRING , allowNull: false},
  precio: { type: DataTypes.NUMBER , allowNull: false},
  idCategoria: { type: DataTypes.NUMBER , allowNull: false},
}, 
{
  timestamps: false //no crea campos createdAt ni updateAt
});

//Tabla Ordenes
const ordenes = sequelize.define('ordenes', 
{
  id: { type: DataTypes.NUMBER, primaryKey: true},
  fecha: { type: DataTypes.DATEONLY , allowNull: false},  
  total: { type: DataTypes.NUMBER , allowNull: false},  
}, 
{
  timestamps: false //no crea campos createdAt ni updateAt
});

//Tabla detalleorden
const detalleorden = sequelize.define('detalleorden', 
{
  idorden: { type: DataTypes.NUMBER , primaryKey: true},
  idproducto: { type: DataTypes.NUMBER , primaryKey: true},
  cantidad: { type: DataTypes.NUMBER , allowNull: false},
  precio: { type: DataTypes.NUMBER , allowNull: false}  
}, 
{
  timestamps: false //no crea campos createdAt ni updateAt
});

const db={
    sequelize,
    categorias,
    productos,
    ordenes,
    detalleorden
}
//exporto dos objetos el objeto db.sequelize y el objeto categorias
//export default db;
export {sequelize, categorias, productos, ordenes, detalleorden}; //exporto dos objetos el objeto db.sequelize y el objeto categorias