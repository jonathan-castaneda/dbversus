import mongoose from "mongoose";

// Variable de entorno para la conexión a MongoDB
const hostdb = process.env.HOST_DB || "localhost";
const database = "cafeteria";
const uri = `mongodb://${hostdb}:27017/${database}`;

// Conexión a MongoDB
mongoose.connect(uri);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conectado a MongoDB");
});

// Definición del esquema de Categorías
const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
});
const Categoria = mongoose.model("Categoria", categoriaSchema);

// Definición del esquema de Productos
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  idCategoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true },
});
const Producto = mongoose.model("Producto", productoSchema);

// Definición del esquema de Órdenes
const ordenSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  mesero: { type: String, required: true },
  mesa: { type: String, required: true },
  cliente: { type: String, required: true },
  estado: { type: String, required: true },
  total: { type: Number, required: true },
  observacion: { type: String },
  detalleOrden: [
    {
      cantidad: { type: Number, required: true },
      nombre: { type: String, required: true },
      precio: { type: Number, required: true },
      categoria: {
        nombre: { type: String, required: true },
      },
      subtotal: { type: Number, required: true },
    },
  ],
});
const Orden = mongoose.model("Orden", ordenSchema);

export { db, Categoria, Producto, Orden };


