import { detalleordenesSqlServer, productosSqlServer } from "../../../utils/sqlserver/sqlserver";
import { Sequelize } from "sequelize";

export default defineEventHandler(async (event) => {
    try {
        const data = await detalleordenesSqlServer.findAll({
            attributes: [
                "idproducto",
                [Sequelize.fn("SUM", Sequelize.col("cantidad")), "cantidad_vendida"],
                [Sequelize.col("producto.nombre"), "producto_nombre"]
            ],
            include: [
                {
                    model: productosSqlServer,
                    as: "producto",
                    attributes: []
                }
            ],
            group: [
                "detalleordenes.idproducto", // ✅ Corrección para que coincida con GROUP BY
                "producto.nombre"
            ],
            order: [[Sequelize.fn("SUM", Sequelize.col("cantidad")), "DESC"]], // ✅ Eliminamos `detalleordenes.idorden` del ORDER BY
            limit: 10,
            subQuery: false // ✅ Evita que Sequelize genere un subquery incorrecto
        });

        if (!data.length) {
            return { statusCode: 404, message: "No se encontraron productos vendidos" };
        }

        return { statusCode: 200, data };
    } catch (error) {
        console.error("Error al consultar el top de productos vendidos en SQL Server:", error);
        return { statusCode: 500, error: "Error en la base de datos", details: error.message };
    }
});