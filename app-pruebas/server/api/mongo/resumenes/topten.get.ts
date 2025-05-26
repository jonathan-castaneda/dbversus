import { Orden } from "../../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
  try {
    const data = await Orden.aggregate([
      { $unwind: "$detalleOrden" }, // separamos los arrays
      {
        $group: {
          _id: "$detalleOrden.nombre", // agrupamos por nombre del producto
          cantidad: { $sum: "$detalleOrden.cantidad" }
        }
      },
      {
        $sort: { cantidad: -1 } // ordenamos descendente
      },
      {
        $limit: 10
      },
      {
        $project: {
          nombre: "$_id",
          cantidad: 1,
          _id: 0
        }
      }
    ]);

    return { statusCode: 200, data };
  } catch (error) {
    console.error("Error topten en MongoDB:", error);
    return {
      statusCode: 500,
      error: (error as Error).message,
    };
  }
});
