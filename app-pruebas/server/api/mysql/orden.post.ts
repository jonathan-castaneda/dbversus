//agregamos una orden
import { ordenes } from "../../utils/mysql";
export default defineEventHandler(async (event) => {
    
    const body = await readBody(event);
    //console.log(body)    
    try {
        //valido que en el body vengan todos los campos requeridos
        if (!body.id || !body.fecha || !body.total || body.total < 0 ) {
            return { statusCode: 400, "message": "Faltan campos requeridos" };
        }
        //ahora guardo en la base de datos
        //await db.sequelize.authenticate();
        const data = await ordenes.create({
            id: body.id,
            fecha: body.fecha,
            total: body.total,
        });
        return { statusCode: 200, "message": "insertado" };
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return (error);
    }
})