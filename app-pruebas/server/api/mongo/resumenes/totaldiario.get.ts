import { Orden } from "../../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
  try {
    const data = await Orden.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$fecha" }
          },
          total: { $sum: "$total" }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          fecha: "$_id",
          total: 1,
          _id: 0
        }
      }
    ]);

    return { statusCode: 200, data };
  } catch (error: any) {
    console.error("Error total diario:", error);
    return {
      statusCode: 500,
      error: error.message
    };
  }
});
