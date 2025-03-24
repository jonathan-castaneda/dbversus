import { categorias } from "../../utils/firebird/firebird";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.id || !body.nombre) {
            return { statusCode: 400, message: "ID y nombre son obligatorios" };
        }

        // Insertar en la base de datos
        const result = await categorias.create(body.id, body.nombre);

        return { statusCode: 201, message: "Categoría insertada correctamente", data: result };
    } catch (error) {
        console.error("Error al insertar la categoría:", error);
        return { statusCode: 500, message: "Error interno del servidor" };
    }
});
