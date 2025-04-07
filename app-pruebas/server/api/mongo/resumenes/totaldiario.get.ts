import { Orden } from "../../../utils/mongo/mongo"; 

export default defineEventHandler(async (event) => {
  try {
    const data = await Orden.aggregate([
      { $unwind: "$detalleOrden" },
      {
        $group: {
          _id: "$detalleOrden.nombre", // Agrupamos por el nombre del producto
          cantidad: { $sum: "$detalleOrden.cantidad" }, // Sumamos las cantidades de cada producto
        }
      },
      {
        $sort: { cantidad: -1 } // Ordenamos por cantidad de manera descendente
      },
      {
        $limit: 10 // Limitamos a los 10 primeros productos más vendidos
      },
      {
        $project: {
          nombre: "$_id", // Asignamos el valor de _id a "nombre"
          cantidad: 1, // Devolvemos la cantidad
          _id: 0 // Excluimos el campo _id
        }
      }
    ]);

    // Retornamos los datos con un estado exitoso
    return { statusCode: 200, data };
  } catch (error) {
    console.error("Error al obtener el total diario", error);
    return {
      statusCode: 500,
      error: (error as Error).message, // Retornamos el mensaje de error
    };
  }
});
