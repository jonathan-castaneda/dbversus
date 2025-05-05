import { ordenesSqlServer } from "../../../utils/sqlserver/sqlserver"; // Cambié MySQL por SQL Server
import { Sequelize } from "sequelize";

export default defineEventHandler(async (event) => {
    try {
        // Obtener la fecha y el total de órdenes realizadas en esa fecha, ordenado por fecha
        const data = await ordenesSqlServer.findAll({
            attributes: [
                [Sequelize.fn("CAST", Sequelize.col("fecha") + " AS DATE"), "fecha"], 
                [Sequelize.fn("COUNT", Sequelize.col("id")), "totalOrdenes"]
            ],
            group: [Sequelize.fn("CAST", Sequelize.col("fecha") + " AS DATE")], 
            order: [[Sequelize.fn("CAST", Sequelize.col("fecha") + " AS DATE"), "ASC"]],
            raw: true
        });

        return { statusCode: 200, data };
    } catch (error) {
        console.error("Error al consultar órdenes en SQL Server:", error);
        return { statusCode: 500, error: "Error en la base de datos", details: error };
    }
});