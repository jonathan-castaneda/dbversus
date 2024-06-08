//agregamos una orden
import { ordenes } from "../../utils/mysql";

//importamos fecha de sequelize types
import { DataTypes } from 'sequelize';

export default defineEventHandler(async (event) => {    
    const body = await readBody(event);
    console.log(body)
    try {

        //valido que en el body vengan todos los campos requeridos
        if (!body.id || !body.fecha || !body.total || body.total < 0 ) {
            return { statusCode: 400, "message": "Faltan campos requeridos" };
        }
        //console.log(body) 
        //la fecha viene en string anho,mes,dia
        //la convierto a un objeto Date
        //console.log(body.fecha)
        let [anho,mes,dia] = body.fecha.split(",");
        let lfecha = new Date(anho,mes-1,dia,0,0,0,0);
        //console.log(lfecha)
               
        await ordenes.create({
            id: body.id,
            fecha: lfecha,
            total: body.total
        });
       
        
        return { statusCode: 200, "message": "insertado" };
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return (error);
    }
})