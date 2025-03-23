import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id);

  try {
    const conn = await connect();
    const data = await rethink.table('categorias').get(id).run(conn);
    conn.close();
    if (!data) {
      return { statusCode: 404, error: 'Categoría no encontrada.' };
    }
    return data;
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    return { statusCode: 500, error: 'Error interno del servidor.' };
  }
});