import { categorias } from "../../../utils/firebird/firebird";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params.id; // ID desde la URL
        const body = await readBody(event); // Datos enviados en la solicitud

        if (!id || !body.nombre) {
            return { statusCode: 400, message: "ID y nombre son obligatorios" };
        }

        // Llamamos al método update
        const result = await categorias.update(id, body.nombre);

        return { statusCode: 200, message: "Categoría actualizada correctamente", data: result };
    } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        return { statusCode: 500, message: "Error interno del servidor" };
    }
});