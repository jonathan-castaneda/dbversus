// /server/api/rethinkdb/categorias/insertar.ts
import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';
import { defineEventHandler, readBody, createError } from 'h3' // desde la raiz del proyecto 

export default defineEventHandler(async (event) => {
  try {

    // validamos la conexión
    const conn = await connect();
    if (!conn) {
      throw createError({
        statusCode: 500,
        statusMessage: 'No se pudo conectar a la base de datos.',
      });
    }

    // obtenemos todos los ids 
    const cursor = await rethink.table('categorias').pluck('id').run(conn);
    const docs = await cursor.toArray();
    const ids = docs.map(doc => doc.id);

    const resultados = [];

    for (const id of ids) {
      const doc = await rethink.table('categorias').get(id).run(conn); // consultamos documento x documento 
      resultados.push(doc);
    }

    return { success: true, resultados };



  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al obtener las categorías.',
    });
  }
});

