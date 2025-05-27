// /server/api/rethinkdb/productos/insertar.ts
import { defineEventHandler, readBody } from 'h3' // desde la raiz del proyecto 
import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const cantidad = body.cantidad;
    let contador = Number(body.contador);

    if (!cantidad || typeof cantidad !== 'number') {
      return { success: false, error: 'Cantidad inválida' };
    }

    const conn = await connect();

    // generando  los datos que se van a insertar 
    const productos = Array.from({ length: cantidad }, (_, i) => ({
      id: contador + i + 1 ,
      nombre: "producto " + (contador + i + 1),
      precio: Math.floor(Math.random() * 100) + 1,
    }));


    // inserciones uno a uno
    let insertados = 0;
    for (const documento of productos) {
      const result  = await rethink.table("productos").insert(documento).run(conn)
      if(result.inserted >= 1){
        insertados += 1;
      }else{
        console.log("fallo al insertar: ", documento)
      }
    }

    return { success: true, inserted: insertados };
  } catch (error: any) {
    console.error("Error al insertar productos:", error);
    return { success: false, error: error.message };
  }
});

