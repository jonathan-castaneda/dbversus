import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

export default defineEventHandler(async (event) => {

  try {
    const conn = await connect();

    // extraemos una fecha ramdon
    const fecha = await rethink.table('ordenes').sample(1).pluck('fecha').run(conn);

    const result = await rethink.table('ordenes')
    //@ts-ignore
      .filter(fecha[0].fecha)
      .concatMap((orden: any) =>
        (orden('detalleOrden') as any).map((detalle: any) =>
          rethink.expr({
            fecha: orden('fecha'),
            idproducto: detalle('id'),
            cantidad: detalle('cantidad')
          })
        )
      )
      .eqJoin('idproducto', rethink.table('productos'))
      .map((row: any) =>
        rethink.expr({
          fecha: row('left')('fecha'),
          nombre: row('right')('nombre'),
          cantidad: row('left')('cantidad')
        })
      )
      //@ts-ignore
      .group((row: any) => [row('fecha'), row('nombre')])
      .reduce((a: any, b: any) =>
        rethink.expr({
          fecha: a('fecha'),
          nombre: a('nombre'),
          cantidad: a('cantidad').add(b('cantidad'))
        })
      )
      .ungroup()
      .map((row: any) =>
        rethink.expr({
          fecha: row('group')(0),
          nombre: row('group')(1),
          cantidad: row('reduction')('cantidad')
        })
      )
      .orderBy('fecha')
      .run(conn)

    return { statusCode: 200, data: result }
  } catch (error) {
    console.error('Error resumen productos diarios:', error)
    return { statusCode: 500, error: error }
  }
})
