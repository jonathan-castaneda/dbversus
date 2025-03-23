//buscamos una categoria por su ID dicho id viene en el get
import { Categoria } from "../../../utils/mongo/mongo"; 
import mongoose from "mongoose"; // Importar mongoose para trabajar con ObjectId

export default defineEventHandler(async (event) => {
    try {
        const { id } = event.context.params; // Obtener el ID de la URL

        // Verificar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { statusCode: 400, message: "ID inválido" };
        }

        // Buscar la categoría por su ObjectId
        const data = await Categoria.findOne({ _id: id });

        if (!data) {
            return { statusCode: 404, message: "Categoría no encontrada" };
        }

        return { statusCode: 200, categoria: data };
    } catch (error) {
        console.error("Error al consultar MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }
});