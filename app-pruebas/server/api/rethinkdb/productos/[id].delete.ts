import { connect, r } from '~/server/utils/rethinkdb/rethinkdb';

	export default defineEventHandler(async (event) => {
	  const id = parseInt(event.context.params.id) ; // ID como string

	  try {
	    const conn = await connect();
	    const result = await r.table('productos').get(id).delete().run(conn);
	    conn.close();
	    return { statusCode: 200, message: 'producto eliminado', data: result };
	  } catch (error) {
	    console.error('Error al eliminar producto:', error);
	    return { statusCode: 500, error: 'Error interno del servidor.' };
	  }
	});