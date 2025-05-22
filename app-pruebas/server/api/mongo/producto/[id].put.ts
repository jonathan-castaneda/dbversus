import { Producto } from "../../../utils/mongo/mongo"; // Asegúrate de importar el modelo correcto

export default defineEventHandler(async (event) => {  
    try {
        const id = event.context.params.id; // Obtener el ID del producto
        const body = await readBody(event); // Leer el JSON del body

        // Validamos que haya datos en el body
        if (!body || Object.keys(body).length === 0) {
            return { statusCode: 400, message: "No se enviaron datos para actualizar" };
        }

        // Actualizamos el producto en MongoDB
        const data = await Producto.findByIdAndUpdate(id, body, { new: true });

        if (!data) {
            return { statusCode: 404, message: "Producto no encontrado" };
        }

        return { statusCode: 200, message: "Producto actualizado", producto: data };
    } catch (error) {
        console.error("Error al actualizar producto en MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }    
});
