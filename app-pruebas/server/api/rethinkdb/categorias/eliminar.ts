// /server/api/rethinkdb/categorias/insertar.ts
import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';
import { defineEventHandler, createError } from 'h3' // desde la raiz del proyecto 

// el consumo de la api (endpoint) sera: await insertarCategorias(50) => ./composable

export default defineEventHandler(async (event) => {
  try {

    // Intentar establecer la conexión
    const conn = await connect();
    if (!conn) {
      throw createError({
        statusCode: 500,
        statusMessage: 'No se pudo conectar a la base de datos.',
      });
    }

    // eliminamos los datos, documento x documento 
    const cursor = await rethink.table("categorias").run(conn);
    const categorias = await cursor.toArray();

    let eliminaciones = 0;
    for(const documento of categorias){
      const result = await rethink.table("categorias").get(documento.id).delete().run(conn);
      if(result.deleted >= 1){
        eliminaciones += 1;
      }else{
        console.log("Error en la eliminacion de las categorias", result.errors);
      }
    }

    return { success: true, eliminados: eliminaciones };

  } catch (error) {
    console.error('Error al insertar categorías:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al insertar categorías.',
    });
  }
});

