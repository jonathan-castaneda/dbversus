import { detalleordenesSqlServer, productosSqlServer } from "../../../utils/sqlserver/sqlserver"; // Cambié MySQL por SQL Server
import { Sequelize } from "sequelize";

export default defineEventHandler(async (event) => {
    try {
        // Obtener el top 10 de productos vendidos
        const data = await detalleordenesSqlServer.findAll({
            attributes: [
                "idproducto",
                [Sequelize.fn("SUM", Sequelize.col("cantidad")), "cantidad_vendida"]
            ],
            include: [
                {
                    model: productosSqlServer,
                    attributes: ["nombre"]
                }
            ],
            group: ["detalleordenes.idproducto", "productos.nombre"],
            order: [[Sequelize.fn("SUM", Sequelize.col("cantidad")), "DESC"]],
            limit: 10,
            raw: true
        });

        if (!data.length) {
            return { statusCode: 404, message: "No se encontraron productos vendidos" };
        }

        return { statusCode: 200, data };
    } catch (error) {
        console.error("Error al consultar el top de productos vendidos en SQL Server:", error);
        return { statusCode: 500, error: "Error en la base de datos", details: error };
    }
});