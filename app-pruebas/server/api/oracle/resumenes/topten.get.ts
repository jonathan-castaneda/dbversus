//este end poin ejecuta la siguiente consulta sql para obtener el top ten 
// de productos vendidos
//select detalleordenes.idproducto, productos.nombre, sum(detalleordenes.cantidad) 
//from ordenes join detalleordenes on ordenes.id = detalleordenes.idorden
//join productos on detalleordenes.idproducto = productos.id 
//group by productos.id, productos.nombre 
//order by 3 desc
//limit 10

import { ordenes, detalleordenes, productos } from "../../../utils/oracle/oracle";
export default defineEventHandler(async (event) => {   
    try {               
        const data = await detalleordenes.findAll({
            attributes: ['IDPRODUCTO', [sequelize.fn('SUM', sequelize.col('CANTIDAD')), 'CANTIDAD']],
            include: [
                {
                    model: productos,
                    attributes: ['NOMBRE'],
                }
            ],
            group: ['IDPRODUCTO', 'NOMBRE'],
            order: [[sequelize.fn('SUM', sequelize.col('CANTIDAD')), 'DESC']],
            limit: 10
        });
        return { statusCode:200, data };
    } catch (error) {
        console.error('Error topten:', error);
        return(error)
    }    
})