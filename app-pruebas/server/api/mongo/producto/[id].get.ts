import { Producto } from "../../../utils/mongo/mongo"; // Asegúrate de importar el modelo correcto

export default defineEventHandler(async (event) => {      
    try {
        const id = event.context.params.id; // Obtener el ID del producto

        // Buscamos el producto en MongoDB por su ObjectId
        const data = await Producto.findById(id);

        if (!data) {
            return { statusCode: 404, message: "Producto no encontrado" };
        }

        return { statusCode: 200, producto: data };
    } catch (error) {
        console.error("Error al buscar el producto en MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }
});

