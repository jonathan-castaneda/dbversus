import { ordenesSqlServer, detalleordenesSqlServer, productosSqlServer } from "../../../utils/sqlserver/sqlserver"; // Cambié MySQL por SQL Server
import { Sequelize } from "sequelize";

export default defineEventHandler(async (event) => {
    try {
        // Obtener la fecha, el nombre del producto y la cantidad vendida en esa fecha
        const data = await ordenesSqlServer.findAll({
            attributes: [
                [Sequelize.fn("CAST", Sequelize.col("fecha") + " AS DATE"), "fecha"]
            ],
            include: [
                {
                    model: detalleordenesSqlServer,
                    attributes: [[Sequelize.fn("SUM", Sequelize.col("cantidad")), "cantidad_vendida"]],
                    include: [
                        {
                            model: productosSqlServer,
                            attributes: ["id", "nombre"]
                        }
                    ]
                }
            ],
            group: [
                Sequelize.fn("CAST", Sequelize.col("fecha") + " AS DATE"),
                "detalleordenes.idproducto",
                "productos.nombre"
            ],
            order: [[Sequelize.fn("CAST", Sequelize.col("fecha") + " AS DATE"), "ASC"]],
            raw: true
        });

        return { statusCode: 200, data };
    } catch (error) {
        console.error("Error al consultar ventas diarias en SQL Server:", error);
        return { statusCode: 500, error: "Error en la base de datos", details: error };
    }
});