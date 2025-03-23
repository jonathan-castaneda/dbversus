import { connect, rethink } from "~/server/utils/rethinkdb/rethinkdb";

export default defineEventHandler(async () => {
    const conn = await connect();
    if(!conn) {
      console.log('No se pudo conectar a la base de datos');
    }else{
      console.log('Conexión con RethinkDB establecida.');
    }
  //@ts-ignore
    const tableList = await rethink.tableList().run(conn);
    conn.close();
    return { tables: tableList };
  });

  //  eliminar esta funcion, solo se uso para verificar conexion antes de realizar el crud