import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';
import type { H3Event } from 'h3'

export default defineEventHandler(async (_event: H3Event) => {
  try {
    const conn = await connect();
    const result = await rethink.table('ordenes')
      .concatMap((orden) =>
        //@ts-ignore
        orden('detalleOrden').map((detalle: any) =>
          rethink.expr({
            idproducto: detalle('id'),
            cantidad: detalle('cantidad')
          })
        )
      )
      .eqJoin('idproducto', rethink.table('productos'))
      .map((row: any) =>
        rethink.expr({
          idproducto: row('left')('idproducto'),
          cantidad: row('left')('cantidad'),
          nombre: row('right')('nombre')
        })
      )
      //@ts-ignore
      .group('idproducto', 'nombre')
      .reduce((a: any, b: any) =>
        rethink.expr({
          idproducto: a('idproducto'),
          nombre: a('nombre'),
          cantidad: a('cantidad').add(b('cantidad'))
        })
      )
      .ungroup()
      .map((item: any) =>
        rethink.expr({
          idproducto: item('group')(0),
          nombre: item('group')(1),
          cantidad: item('reduction')('cantidad')
        })
      )
      .orderBy(rethink.desc('cantidad'))
      .limit(10)
      .run(conn);

      const data = result.toArray();

    return { statusCode: 200, data: data };
  } catch (error) {
    console.error('Error Top 10:', error);
    return { statusCode: 500, error: 'Error al obtener el top 10 de productos' };
  }
});
