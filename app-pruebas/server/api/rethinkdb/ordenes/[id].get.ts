import { connect, r } from '~/server/utils/rethinkdb/rethinkdb';

	import { defineEventHandler } from 'h3';

	export default defineEventHandler(async (event) => {
	  const id = parseInt(event.context.params.id); // Asegúrate de que id sea un número

	  console.log('Entrando a ordenes/[id].get.ts con id:', id, typeof id);

	  try {
	    const conn = await connect();
	    console.log('Conexión a RethinkDB establecida.');

	    console.log('Ejecutando consulta RethinkDB con id:', id);
	    const orden = await r.table('ordenes').get(id).run(conn);
	    console.log('Resultado de la consulta RethinkDB:', orden);

	    conn.close();
	    if (!orden) {
	      console.log('Orden no encontrada');
	      return { statusCode: 404, error: 'Orden no encontrada' };
	    }
	    console.log('Orden encontrada:', orden);
	    return orden;

	  } catch (error) {
	    console.error('Error al obtener orden:', error);
	    return { statusCode: 500, error: 'Error interno del servidor' };
	  }
	});