// /server/api/rethinkdb/ordenes/insertar.ts
import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';
import { defineEventHandler, createError } from 'h3' // desde la raiz del proyecto 

export default defineEventHandler(async (event) => {
  try {

    // validar la conexión
    const conn = await connect();
    if (!conn) {
      throw createError({
        statusCode: 500,
        statusMessage: 'No se pudo conectar a la base de datos.',
      });
    }

    // eliminamos los datos, documento x documento 
    const cursor = await rethink.table("ordenes").run(conn);
    const ordenes = await cursor.toArray();

    let eliminaciones = 0;
    for(const documento of ordenes){
      const result = await rethink.table("ordenes").get(documento.id).delete().run(conn);
      if(result.deleted >= 1){
        eliminaciones += 1;
      }else{
        console.log("Error en la eliminacion de las ordenes", result.errors);
      }
    }

    return { success: true, eliminados: eliminaciones };

  } catch (error) {
    console.error('Error al insertar ordenes:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al insertar ordenes.',
    });
  }
});

