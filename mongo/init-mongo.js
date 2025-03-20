db = db.getSiblingDB('cafeteria'); // Selecciona la base de datos y la crea si esta no existe

db.createCollection('categorias'); // Crea la colección categorias
db.createCollection('productos');// Crea la coleccion productos
db.createCollection('ordenes'); // Crea la coleccion ordenes