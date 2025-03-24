import { categorias } from "../../../utils/firebird/firebird";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params.id; // Obtener el ID de la URL

        if (!id) {
            return { statusCode: 400, message: "ID es obligatorio" };
        }

        // Eliminar la categoría
        const result = await categorias.delete(id);

        return { statusCode: 200, message: "Categoría eliminada correctamente", data: result };
    } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        return { statusCode: 500, message: "Error interno del servidor" };
    }
});
