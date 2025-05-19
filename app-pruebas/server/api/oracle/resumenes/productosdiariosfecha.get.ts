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

import { Sequelize, QueryTypes } from 'sequelize';
import { sequelize } from "../../../utils/oracle/oracle";

export default defineEventHandler(async (event) => {   
    const { fecha } = getQuery(event);

    // Validate fecha presence
    if (!fecha) {
        return {
            statusCode: 400,
            message: "El parámetro 'fecha' es requerido. Ejemplo: ?fecha=2024-01-02"
        };
    }

    // Normalize and validate date
    const fechaStr = String(fecha).split('T')[0].trim();
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fechaStr)) {
        return {
            statusCode: 400,
            message: "El formato de 'fecha' debe ser YYYY-MM-DD. Ejemplo: 2024-01-02"
        };
    }

    try {               
        const data = await sequelize.query(`
            SELECT 
                o.FECHA,
                d.IDPRODUCTO,
                p.NOMBRE,
                SUM(d.CANTIDAD) AS TOTAL_CANTIDAD
            FROM 
                CAFETERIA.ORDENES o
            INNER JOIN 
                CAFETERIA.DETALLEORDENES d ON o.ID = d.IDORDEN
            INNER JOIN 
                CAFETERIA.PRODUCTOS p ON d.IDPRODUCTO = p.ID
            WHERE 
                TRUNC(o.FECHA) = TO_DATE(:fecha, 'YYYY-MM-DD')
            GROUP BY 
                o.FECHA,
                d.IDPRODUCTO,
                p.NOMBRE
            ORDER BY 
                o.FECHA
        `, {
            replacements: { fecha: fechaStr },
            type: QueryTypes.SELECT
        });

        if (data.length === 0) {
            return {
                statusCode: 200,
                message: `No se encontraron datos para la fecha ${fechaStr}`,
                data: []
            };
        }

        return { 
            statusCode: 200, 
            data 
        };
    } catch (error) {
        console.error('Error en productosdiariosfecha:', error);
        return error;
    }    
});