//mostraremos la FECHA, luego el NOMBRE del producto y la cantidad de ese producto vendido en esa FECHA
//las tablas a consultar son ordenes, detalleordenes y productos
//la consulta SQL seria: 
//select ordenes.FECHA, detalleordenes.idproducto, productos.NOMBRE, sum(detalleordenes.cantidad) 
//from ordenes join detalleordenes on ordenes.ID = detalleordenes.idorden
//join productos on detalleordenes.idproducto = productos.ID 
//group by ordenes.FECHA, detalleordenes.idproducto, productos.NOMBRE order by ordenes.FECHA
//implementamos esta consulta sql en sequelize
import { ordenes, detalleordenes, productos } from "../../../utils/oracle/oracle";
export default defineEventHandler(async (event) => {      
    try {
        const data = await ordenes.findAll({
            attributes: ['FECHA'],
            include: [
                {
                    model: detalleordenes,
                    attributes: ['CANTIDAD'],
                    include: [
                        {
                            model: productos,
                            attributes: ['ID','NOMBRE'],
                        }
                    ]
                }
            ],
            group: ['FECHA','ID', 'DETALLEORDENES.IDPRODUCTO', 'NOMBRE'],
            order: ['FECHA']
        });
        return { statusCode:200, data };
    } catch (error) {
        console.error('Error productosdiarios:', error);
        return(error)
    }    
})

