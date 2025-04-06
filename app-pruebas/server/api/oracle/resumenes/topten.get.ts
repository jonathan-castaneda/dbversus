//este end poin ejecuta la siguiente consulta sql para obtener el top ten 
// de productos vendidos
//select detalleordenes.idproducto, productos.nombre, sum(detalleordenes.cantidad) 
//from ordenes join detalleordenes on ordenes.id = detalleordenes.idorden
//join productos on detalleordenes.idproducto = productos.id 
//group by productos.id, productos.nombre 
//order by 3 desc
//limit 10

import { Sequelize, QueryTypes } from 'sequelize';
import { sequelize, ordenes, detalleordenes, productos } from "../../../utils/oracle/oracle";

export default defineEventHandler(async (event) => {   
    try {               
        const data = await sequelize.query(`
            SELECT 
                d.IDPRODUCTO, 
                SUM(d.CANTIDAD) AS CANTIDAD, 
                p.NOMBRE AS "PRODUCTOS.NOMBRE"
            FROM 
                CAFETERIA.DETALLEORDENES d
            INNER JOIN 
                CAFETERIA.PRODUCTOS p ON d.IDPRODUCTO = p.ID
            GROUP BY 
                d.IDPRODUCTO, 
                p.NOMBRE
            ORDER BY 
                SUM(d.CANTIDAD) DESC
            FETCH NEXT 10 ROWS ONLY
        `, {
            type: QueryTypes.SELECT,
            logging: console.log
        });
        return { statusCode: 200, data };
    } catch (error) {
        console.error('Error topten:', error);
        return error;
    }    
});