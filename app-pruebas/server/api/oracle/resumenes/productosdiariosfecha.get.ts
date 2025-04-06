//mostraremos la fecha, luego el nombre del producto y la cantidad de ese producto vendido en esa fecha
//las tablas a consultar son ordenes, detalleordenes y productos
//la consulta SQL seria: 
//select ordenes.fecha, detalleordenes.idproducto, productos.nombre, sum(detalleordenes.cantidad) 
//from ordenes join detalleordenes on ordenes.id = detalleordenes.idorden
//join productos on detalleordenes.idproducto = productos.id 
//where ordenes.fecha = '2021-09-01'
//group by ordenes.fecha, detalleordenes.idproducto, productos.nombre order by ordenes.fecha
//implementamos esta consulta sql en sequelize y el filtro por fecha se pasa como parametro

// SE DEBE INVOCAR ASI
//http://localhost:3000/api/oracle/resumenes/productosdiariosfecha?fecha=2024-01-02

import { Sequelize, QueryTypes } from 'sequelize'; // Asegúrate de importar QueryTypes
import { sequelize, ordenes, detalleordenes, productos } from "../../../utils/oracle/oracle";

export default defineEventHandler(async (event) => {   
    const { fecha } = getQuery(event);

    if (!fecha) {
        return {
            statusCode: 400,
            message: "El parámetro 'fecha' es requerido. Ejemplo: ?fecha=2024-01-02"
        };
    }

    try {               
        const data = await sequelize.query(`
            SELECT 
                d.IDPRODUCTO, 
                SUM(d.CANTIDAD) AS CANTIDAD, 
                p.ID AS "PRODUCTOS.ID", 
                p.NOMBRE AS "PRODUCTOS.NOMBRE"
            FROM 
                CAFETERIA.DETALLEORDENES d
            INNER JOIN 
                CAFETERIA.PRODUCTOS p ON d.IDPRODUCTO = p.ID
            INNER JOIN 
                CAFETERIA.ORDENES o ON d.IDORDEN = o.ID
            WHERE 
                o.FECHA = :fecha
            GROUP BY 
                d.IDPRODUCTO, 
                p.ID, 
                p.NOMBRE
            ORDER BY 
                SUM(d.CANTIDAD) DESC
            FETCH NEXT 10 ROWS ONLY
        `, {
            replacements: { fecha: fecha },
            type: QueryTypes.SELECT // Usar QueryTypes.SELECT en lugar de sequelize.QueryTypes.SELECT
        });
        return { statusCode: 200, data };
    } catch (error) {
        console.error('Error productosdiariosfecha:', error);
        return error;
    }    
});