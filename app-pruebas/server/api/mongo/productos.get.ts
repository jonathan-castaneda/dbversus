import { Producto } from "../../utils/mongo/mongo"; // Asegúrate de importar el modelo correcto

export default defineEventHandler(async (event) => {      
    try {        
        const data = await Producto.find(); // Obtener todos los productos
        return { statusCode: 200, productos: data };
    } catch (error) {
        console.error("Error al obtener productos en MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }    
});

