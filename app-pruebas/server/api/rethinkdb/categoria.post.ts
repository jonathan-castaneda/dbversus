import { connect, rethink  } from "~/server/utils/rethinkdb/rethinkdb";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const conn = await connect();
    const result = await rethink.table('categorias').insert(body).run(conn);
    conn.close();
    return { statusCode: 200, message: 'insertado', data: result };
  } catch (error) {
    console.error('Error al insertar categoría:', error);
    return { statusCode: 500, error: 'Error interno del servidor.' };
  }
});