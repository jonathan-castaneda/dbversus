import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id);

  try {
    const conn = await connect();
    const result = await rethink.table('categorias').get(id).delete().run(conn);
    conn.close();
    return { statusCode: 200, message: 'Categoría eliminada', data: result };
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    return { statusCode: 500, error: 'Error interno del servidor.' };
  }
});