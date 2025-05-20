import { Orden } from "../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        // Validación básica de campos requeridos
        if (!body.mesero || !body.mesa || !body.cliente || !body.total || !Array.isArray(body.detalleOrden)||!body._id) {
            return { statusCode: 400, message: "Faltan campos requeridos o detalleOrden inválido" };
        }

        // Creamos la orden con el detalle ya embebido
        const nuevaOrden = await Orden.create({
            _id:body._id,
            fecha: body.fecha ? new Date(body.fecha) : new Date(),
            mesero: body.mesero,
            mesa: body.mesa,
            cliente: body.cliente,
            estado: body.estado || "C", // Valor por defecto si no lo mandan
            total: body.total,
            observacion: body.observacion || "",
            detalleOrden: body.detalleOrden, // Se espera que sea un array de objetos
        });

        return { statusCode: 200, message: "Orden insertada", orden: nuevaOrden };
    } catch (error) {
        console.error("Error al insertar orden en MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }
});
