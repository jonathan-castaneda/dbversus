import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

	export default defineEventHandler(async (event) => {
	  const id = parseInt(event.context.params.id); // Asegúrate de que id sea un número


	  try {
	    const conn = await connect();

	    const producto = await rethink.table('productos').get(id).run(conn);

	    conn.close();
	    if (!producto) {
	      console.log('producto no encontrado');
	      return { statusCode: 404, error: 'producto no encontrada' };
	    }
	    console.log('producto encontrada:', producto);
	    return producto;

	  } catch (error) {
	    console.error('Error al obtener producto:', error);
	    return { statusCode: 500, error: 'Error interno del servidor' };
	  }
	});