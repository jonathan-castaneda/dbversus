//obtenemos todas las categorias de la base de datos
import mongoose from "mongoose";
import { Categoria } from "../../utils/mongo/mongo"; 

export default defineEventHandler(async (event) => {
    try {
        // Obtener todas las categorías
        const data = await Categoria.find(); 
        
        // Si no hay categorías, devolver un mensaje vacío
        if (!data.length) {
            return { statusCode: 404, message: "No se encontraron categorías" };
        }

        return { statusCode: 200, categorias: data };
    } catch (error) {
        console.error("Error al consultar MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }
});
