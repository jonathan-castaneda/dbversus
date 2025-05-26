
import { Producto } from "../../utils/mongo/mongo"; 

export default defineEventHandler(async (event) => {
    const body = await readBody(event); 

    try {
        
        if (!body._id||!body.nombre || !body.precio || body.precio < 0 || !body.idCategoria) {
            return { statusCode: 400, message: "Faltan campos requeridos" };
        }

       
        const data = await Producto.create({
            _id:body._id,
            nombre: body.nombre,
            precio: body.precio,
            idCategoria: body.idCategoria,
        });

        return { statusCode: 200, message: "Producto insertado", producto: data };
    } catch (error) {
        console.error("Error al insertar en MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }
});
