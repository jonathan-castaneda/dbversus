// /server/api/rethinkdb/productos/insertar.ts
import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';
import { defineEventHandler, readBody, createError } from 'h3' // desde la raiz del proyecto 

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // se consultaraan 25 datos aleatorios
    const cantidad = body.cantidad;

    if (!cantidad || typeof cantidad !== 'number') {
      return { success: false, error: 'cantidadd invalida'}
    }

    // verificamos la conexion
    const conn = await connect();
    if (!conn) {
      throw createError({
        statusCode: 500,
        statusMessage: 'No se pudo conectar a la base de datos.',
      });
    }

    // obtenemos varios docs al azar 
    const cursor = await rethink.table('productos').sample(cantidad).run(conn);
    const data = await cursor.toArray();

    return { success: true, data };
    
  } catch (error) {
    console.error('Error al insertar productos:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al insertar productos.',
    });
  }
});

