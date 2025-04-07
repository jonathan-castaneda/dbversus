import { connect, r } from '~/server/utils/rethinkdb/rethinkdb';

	export default defineEventandler(async (event) => {
	  const id = parseInt(event.context.params.id) ; // ID como string

	  try {
	    const conn = await connect();
	    const result = await r.table('ordenes').get(id).delete().run(conn);
	    conn.close();
	    return { statusCode: 200, message: 'orden eliminada', data: result };
	  } catch (error) {
	    console.error('Error al eliminar orden:', error);
	    return { statusCode: 500, error: 'Error interno del servidor.' };
	  }
	});