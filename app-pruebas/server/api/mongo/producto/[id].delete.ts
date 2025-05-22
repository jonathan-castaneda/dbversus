import { Producto } from "../../../utils/mongo/mongo"; // Asegúrate de importar el modelo correcto

export default defineEventHandler(async (event) => {   
    try {
        const id = event.context.params.id; // Obtener el ID del producto

        // Eliminamos el producto de la base de datos
        const result = await Producto.findByIdAndDelete(id);

        if (!result) {
            return { statusCode: 404, message: "Producto no encontrado" };
        }

        return { statusCode: 200, message: "Producto eliminado" };
    } catch (error) {
        console.error("Error al eliminar producto en MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }
});
