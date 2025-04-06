import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

	export default defineEventHandler(async (event) => {
	  const body = await readBody(event);
	  try {
	    const conn = await connect();
	    const result = await rethink.table('ordenes').insert(body).run(conn);
	    conn.close();
	    return { statusCode: 200, message: 'Orden creada', data: result };
	  } catch (error) {
	    console.error('Error al crear orden:', error);
	    return { statusCode: 500, error: 'Error interno del servidor' };
	  }
	});