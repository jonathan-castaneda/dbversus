// /server/api/rethinkdb/ordenes/insertar.ts
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

    function getFechaRandom(): string {
      const start = new Date(2000, 0, 1); // 1 de enero de 2000
      const end = new Date(2030, 11, 31); // 31 de diciembre de 2030

      const fechaRandom = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

      const yyyy = fechaRandom.getFullYear();
      const mm = String(fechaRandom.getMonth() + 1).padStart(2, '0');
      const dd = String(fechaRandom.getDate()).padStart(2, '0');

      return `${yyyy}/${mm}/${dd}`;
    }


    // generando  los datos que se van a insertar 
    const ordenes = Array.from({ length: cantidad }, (_, i) => ({
      id: contador + i + 1,
      fecha: getFechaRandom(),
      total: Math.floor(Math.random() * 100) + 1,
      detalleOrden:[{
        id: contador + i + 2,
        cantidad: Math.floor(Math.random() * 10) + 1,
        precio: Math.floor(Math.random() * 100) + 1,
      }]
    }));

    // inserciones uno a uno
    let insertados = 0;
    for (const documento of ordenes) {
      const result  = await rethink.table("ordenes").insert(documento).run(conn)
      if(result.inserted >= 1){
        insertados += 1;
      }else{
        console.log("fallo al insertar: ", documento)
      }
    }

    return { success: true, inserted: insertados };
  } catch (error: any) {
    console.error("Error al insertar ordenes:", error);
    return { success: false, error: error.message };
  }
});

