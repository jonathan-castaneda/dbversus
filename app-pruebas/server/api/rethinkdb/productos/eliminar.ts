// /server/api/rethinkdb/productos/insertar.ts
import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';
import { defineEventHandler, createError } from 'h3' // desde la raiz del proyecto 

export default defineEventHandler(async (event) => {
  try {

    // verificamos la conexion
    const conn = await connect();
    if (!conn) {
      throw createError({
        statusCode: 500,
        statusMessage: 'No se pudo conectar a la base de datos.',
      });
    }

    // eliminamos los datos, documento x documento 
    const cursor = await rethink.table("productos").run(conn);
    const productos = await cursor.toArray();

    let eliminaciones = 0;
    for(const documento of productos){
      const result = await rethink.table("productos").get(documento.id).delete().run(conn);
      if(result.deleted >= 1){
        eliminaciones += 1;
      }else{
        console.log("Error en la eliminacion de las productos", result.errors);
      }
    }

    return { success: true, eliminados: eliminaciones };

  } catch (error) {
    console.error('Error al insertar productos:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al insertar productos.',
    });
  }
});

