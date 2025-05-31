import { Orden } from "../../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;

    const resultado = await Orden.findByIdAndDelete(id);

    if (!resultado) {
      return { statusCode: 404, message: "Orden no encontrada" };
    }

    return {
      statusCode: 200,
      message: "Orden eliminada exitosamente"
    };
  } catch (error) {
    console.error("Error al eliminar orden en MongoDB:", error);
    return {
      statusCode: 500,
      error: error.message
    };
  }
});