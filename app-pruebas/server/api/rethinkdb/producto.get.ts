import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

	export default defineEventHandler(async (event) => {
	  try {
	    const conn = await connect();
	    const cursor = await rethink.table('productos').run(conn);
	    const productos = await cursor.toArray();
	    conn.close();
	    return productos;
	  } catch (error) {
	    console.error('Error al obtener productos:', error);
	    return { statusCode: 500, error: 'Error interno del servidor' };
	  }
	});