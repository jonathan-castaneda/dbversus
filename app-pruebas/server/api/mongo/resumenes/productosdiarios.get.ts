import { Orden } from "../../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
  try {
    const data = await Orden.aggregate([
      {
        $unwind: "$detalleOrden" // Desenrollamos cada producto del array detalleOrden
      },
      {
        $group: {
          _id: "$detalleOrden.nombre", // Agrupamos por nombre de producto
          totalVendidos: { $sum: "$detalleOrden.cantidad" }
        }
      },
      {
        $sort: { totalVendidos: -1 } // Opcional: ordenar por los más vendidos
      },
      {
        $project: {
          producto: "$_id",
          totalVendidos: 1,
          _id: 0
        }
      }
    ]);

    return { statusCode: 200, data };
  } catch (error:any) {
    console.error("Error al resumir productos vendidos en MongoDB:", error);
    return {
      statusCode: 500,
      error: error.message
    };
  }
});
