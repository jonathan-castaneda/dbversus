import { connect, rethink } from "./rethinkdb";


export async function verificarTablas() {
  try {
    const conn = await connect();
    // @ts-ignore
    const tableList = await rethink.tableList().run(conn);
    const tablasNecesarias = ['categorias', 'productos', 'ordenes'];

    for (const tabla of tablasNecesarias) {
      if (tableList.includes(tabla)) {
        console.log(`La tabla '${tabla}' existe.`);
      } else {
        console.log(`La tabla '${tabla}' no existe.`);
      }
    }

    conn.close();
    return true;
  } catch (error) {
    console.error('Error al verificar las tablas:', error);
    return false;
  }
}