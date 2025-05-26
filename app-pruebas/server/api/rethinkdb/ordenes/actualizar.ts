// /server/api/rethinkdb/ordenes/insertar.ts
import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';
import { defineEventHandler, readBody, createError } from 'h3' // desde la raiz del proyecto 

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const cantidad = body.cantidad

    if (!cantidad || typeof cantidad !== 'number') {
      return { success: false, error: 'cantidadd invalida'}
    }

    // validamos la conexion
    const conn = await connect();
    if (!conn) {
      throw createError({
        statusCode: 500,
        statusMessage: 'No se pudo conectar a la base de datos.',
      });
    }

    // extraemos aleatoriamente la cantidad pasada 
    const result = await rethink.table('ordenes').sample(cantidad).run(conn);
    const docs = await result.toArray();

    // se edita uno a uno 
    const updateOps = docs.map(doc =>
      rethink.table('ordenes')
        .get(doc.id)
        .update({ total: Math.floor(Math.random() * 100) + 1, }) // actualizamos el total con un nuevo valor aleatorio entre 1 y 100
        .run(conn)
    );

    await Promise.all(updateOps);

    return { success: true, actualizados: updateOps.length };
    
  } catch (error) {
    console.error('Error al insertar ordenes:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al insertar ordenes.',
    });
  }
});

