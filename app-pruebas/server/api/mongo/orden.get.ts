// Archivo: server/api/mongo/orden/index.get.ts

import { Orden } from "../../utils/mongo/mongo"; 

export default defineEventHandler(async (event) => {      
    try {        
        const data = await Orden.find();
        return { statusCode: 200, ordenes: data };
    } catch (error) {
        console.error("Error al obtener órdenes en MongoDB:", error);
        return { statusCode: 500, error: error.message };
    }    
});
