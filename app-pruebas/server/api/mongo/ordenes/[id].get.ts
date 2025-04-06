import { Orden } from "../../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;

    const data = await Orden.findById(id);

    if (!data) {
      return { statusCode: 404, message: "Orden no encontrada" };
    }

    return {
      statusCode: 200,
      orden: data 
    };
  } catch (error) {
    console.error("Error al obtener orden de MongoDB:", error);
    return {
      statusCode: 500,
      error: error.message
    };
  }
});
