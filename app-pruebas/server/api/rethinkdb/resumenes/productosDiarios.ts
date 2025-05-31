import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

interface DetalleOrden {
  id: number;      
  cantidad: number;
  precio?: number;
}

interface Resultado {
  fecha: string;
  nombre: string;
  cantidad: number;
}

export default defineEventHandler(async (): Promise<{ statusCode: number; data?: Resultado[]; error?: string }> => {

  try {
    const conn = await connect();
    const data = await rethink.table('ordenes')
      .concatMap(orden =>
        // @ts-ignore
        rethink.expr(orden('detalleOrden')).map((detalle: any) =>
          rethink.expr({
            fecha: orden('fecha'),
            idproducto: detalle('id'),
            cantidad: detalle('cantidad')
          })
        )
      )
      .eqJoin('idproducto', rethink.table('productos'))
      .map((joined: any) =>
        rethink.expr({
          fecha: joined('left')('fecha'),
          nombre: joined('right')('nombre'),
          cantidad: joined('left')('cantidad')
        })
      )
      // @ts-ignore
      .group((row: any) => [row('fecha'), row('nombre')])
      .reduce((a: any, b: any) =>
        rethink.expr({
          fecha: a('fecha'),
          nombre: a('nombre'),
          cantidad: a('cantidad').add(b('cantidad'))
        })
      )
      .ungroup()
      .map((doc: any) =>
        rethink.expr({
          fecha: doc('group')(0),
          nombre: doc('group')(1),
          cantidad: doc('reduction')('cantidad')
        })
      )
      .orderBy('fecha')
      .run(conn);

      const result = data.toArray()

    return { statusCode: 200, data:result };
  } catch (error: any) {
    console.error('Error productosdiarios:', error);
    return { statusCode: 500, error: error.message };
  }
});
