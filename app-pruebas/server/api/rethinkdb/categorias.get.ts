import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

export default defineEventHandler(async (event) => {
  try {
    const conn = await connect();
    const cursor = await rethink.table('categorias').run(conn);
    const categorias = await cursor.toArray();
    conn.close();
    return categorias;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return { statusCode: 500, error: 'Error interno del servidor.' };
  }
});