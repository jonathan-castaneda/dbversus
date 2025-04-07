import { connect, r } from '~/server/utils/rethinkdb/rethinkdb';


	export default defineEventHandler(async (event) => { // <--- Importante: export default
	  const id = parseInt(event.context.params.id);
	  const body = await readBody(event);

	  console.log('ID a actualizar:', id);
	  console.log('Datos a actualizar (body):', body); // <--- Log para depurar

	  try {
	    const conn = await connect();
	    const result = await r.table('productos').get(id).update(body).run(conn);
	    conn.close();

	    console.log('Resultado de RethinkDB:', result); // <--- Log para depurar

	    return { statusCode: 200, message: 'producto actualizado', data: result };
	  } catch (error) {
	    console.error('Error al actualizar el producto:', error);
	    return { statusCode: 500, error: 'Error interno del servidor' };
	  }
	});