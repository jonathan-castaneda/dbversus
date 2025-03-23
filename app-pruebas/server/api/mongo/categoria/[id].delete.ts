//Endpoint para eliminar una categoria de la base de datos
import mongoose from "mongoose";
import { Categoria } from "../../../utils/mongo/mongo"; 

export default defineEventHandler(async (event) => {
    try {
        // Obtener el ID desde la URL
        const { id } = event.context.params;

        // Validar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { statusCode: 400, message: "ID inválido" };
        }

        // Eliminar la categoría usando el ID
        const categoria = await Categoria.findByIdAndDelete(id);

        if (!categoria) {
            return { statusCode: 404, message: "Categoría no encontrada" };
        }

        return { statusCode: 200, message: "Categoría eliminada" };
    } catch (error) {
        console.error("Error al eliminar en MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }
});