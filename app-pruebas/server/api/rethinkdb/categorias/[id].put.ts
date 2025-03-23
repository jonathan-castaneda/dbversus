import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id);
  const body = await readBody(event);

  console.log('ID recibido:', id);
  console.log('Body recibido:', body);

  try {
    const conn = await connect();
    const result = await rethink.table('categorias').get(id).update(body).run(conn);
    conn.close();

    console.log('Resultado de la actualización:', result);

    return { statusCode: 200, message: 'Categoría actualizada', data: result };
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    return { statusCode: 500, error: 'Error interno del servidor.' };
  }
});