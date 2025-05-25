import { Orden } from "../../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
  try {
    const data = await Orden.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$fecha" }
          },
          totalOrdenes: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          fecha: "$_id",
          totalOrdenes: 1,
          _id: 0
        }
      }
    ]);

    return { statusCode: 200, data };
  } catch (error:any) {
    console.error("Error al contar órdenes en MongoDB:", error);
    return {
      statusCode: 500,
      error: error.message
    };
  }
});
