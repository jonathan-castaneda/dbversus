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
            group: ["idproducto", "producto.nombre"], // ✅ Incluyendo todas las columnas necesarias
            order: [[Sequelize.fn("SUM", Sequelize.col("cantidad")), "DESC"]], // ✅ Asegurando que ORDER BY es correcto
            limit: 10,
            subQuery: false // ✅ Evita que Sequelize genere una subquery incorrecta
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