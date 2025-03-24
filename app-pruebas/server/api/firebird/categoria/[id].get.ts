import { categorias } from "../../../utils/firebird/firebird";

export default defineEventHandler(async (event) => {      
    try {
        const id = Number(event.context.params.id);
        if (isNaN(id)) {
            return { statusCode: 400, message: "ID inválido" };
        }

        const data = await categorias.findOne(id);

        if (!data) {
            return { statusCode: 404, message: "Categoría no encontrada" };
        }

        return { statusCode: 200, data };
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        return { statusCode: 500, message: "Error interno del servidor" };
    }
});