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

const categorias = sequelize.define('categorias', 
{
  id: { type: DataTypes.NUMBER, primaryKey: true},
  nombre: { type: DataTypes.STRING , allowNull: false},
}, 
{
  timestamps: false //no crea campos createdAt ni updateAt
});

const db={
    sequelize,
    categorias
}
//exporto dos objetos el objeto db.sequelize y el objeto categorias
//export default db;
export {sequelize, categorias}; //exporto dos objetos el objeto db.sequelize y el objeto categorias