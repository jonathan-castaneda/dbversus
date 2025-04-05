//agregamos una orden
import { Orden } from "../../../utils/mongo/mongo";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const nuevaOrden = new Orden(body);
    const resultado = await nuevaOrden.save();

    return {
      statusCode: 201,
      message: "Orden creada exitosamente",
      orden: resultado
    };
  } catch (error) {
    console.error("Error al insertar orden en MongoDB:", error);
    return {
      statusCode: 500,
      error: error.message
    };
  }
});