//se va actualizar la categoria con el id que viene en el get y el json de la data
import { Categoria } from "../../../utils/mongo/mongo"; 
import mongoose from "mongoose"; // Importar mongoose para trabajar con ObjectId

export default defineEventHandler(async (event) => {
    try {
        const { id } = event.context.params;  // Obtener el ID de la URL
        const body = await readBody(event);   // Obtener los datos del cuerpo de la solicitud

        

        // Actualizar la categoría en MongoDB
        const data = await Categoria.findByIdAndUpdate(id, body, { new: true });

        if (!data) {
            return { statusCode: 404, message: "Categoría no encontrada" };
        }

        return { statusCode: 200, message: "Categoría actualizada", categoria: data };
    } catch (error) {
        console.error("Error al actualizar MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }
});
  