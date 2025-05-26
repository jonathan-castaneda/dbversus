import mongoose from "mongoose";
import { Categoria } from "../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        

        const data = await Categoria.create({
            _id: body._id,
            nombre: body.nombre,
        });

        return { statusCode: 200, message: "Insertado", data };
    } catch (error) {
        console.error("Error al insertar en la base de datos:", error);

        return { 
            statusCode: 500, 
            error: error instanceof Error ? error.message : "Error desconocido" 
        };
    }
});
