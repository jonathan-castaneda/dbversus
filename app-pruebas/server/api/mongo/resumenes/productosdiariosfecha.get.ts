import { Orden } from "../../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
  const { fecha } = getQuery(event);

  try {
    const fechaInicio = new Date(fecha as string);
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + 1); // Para cubrir todo el día

    const data = await Orden.aggregate([
      {
        $match: {
          fecha: {
            $gte: fechaInicio,
            $lt: fechaFin
          }
        }
      },
      {
        $unwind: "$detalleOrden"
      },
      {
        $group: {
          _id: {
            fecha: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
            nombreProducto: "$detalleOrden.nombre"
          },
          cantidadTotal: { $sum: "$detalleOrden.cantidad" }
        }
      },
      {
        $sort: { "_id.fecha": 1 }
      },
      {
        $project: {
          fecha: "$_id.fecha",
          nombreProducto: "$_id.nombreProducto",
          cantidadTotal: 1,
          _id: 0
        }
      }
    ]);

    return { statusCode: 200, data };
  } catch (error: any) {
    console.error("Error productosdiariosfecha (MongoDB):", error);
    return {
      statusCode: 500,
      error: error.message
    };
  }
});
