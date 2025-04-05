import { Orden } from "../../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const data = await readBody(event);

    const ordenActualizada = await Orden.findByIdAndUpdate(id, data, {
      new: true
    });

    if (!ordenActualizada) {
      return { statusCode: 404, message: "Orden no encontrada" };
    }

    return {
      statusCode: 200,
      message: "Orden actualizada exitosamente",
      orden: ordenActualizada
    };
  } catch (error) {
    console.error("Error al actualizar orden en MongoDB:", error);
    return {
      statusCode: 500,
      error: error.message
    };
  }
});