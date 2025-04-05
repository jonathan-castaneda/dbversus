import { connect, rethink } from './rethinkdb';

// insertando nuevas ordenes 
async function ordenesInsertar(total:number): Promise<number> {
    console.log('Insertando Ordenes...');
    let start = new Date().getTime();
    const conn = await connect();
    try {
        for(let i = 1; i <= total; i++){
            const ldata = {
                id: i,
                nombre: `Orden ${i}`
            };
            await rethink.table('ordenes').insert(ldata).run(conn);
        }
    } catch (error) {
        console.error('Error al insertar ordenes:', error);
        return -1;
    }finally{
        conn.close();
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

// consultando todas las ordenes 
async function ordenesConsultar(): Promise<number> {
    console.log('Consultando ordenes...');
    let start = new Date().getTime();
    const conn = await connect();
    try {
        await rethink.table('ordenes').run(conn);
    } catch (error) {
        console.error('Error al consultar ordenes:', error);
        return -1;
    }finally{
        conn.close();
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

// consultando ordenes al azar
async function ordenesConsultarAzar(total:number): Promise<number> {
    console.log('Consultando ordenes al azar...');
    let start = new Date().getTime();
    const conn = await connect();
    try {
        for(let i = 1; i <= total; i++){
            let id = Math.floor(Math.random() * total) + 1;
            // el id debe de ser string o number ??
            await rethink.table('ordenes').get(id.toString()).run(conn);
        }
    } catch (error) {
        console.error('Error al consultar ordenes al azar:', error);
        return -1;
    }finally{
        conn.close();
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

// actualizamos las ordenes 
async function ordenesActualizar(total:number): Promise<number> {
    console.log('Actualizando ordenes...');
    let start = new Date().getTime();
    const conn = await connect();
    try {
        for(let i = 1; i <= total; i++){
            const ldata = {
                nombre: `Orden ${i} actualizada`
            };
            await rethink.table('ordenes').get(i.toString()).update(ldata).run(conn);
        }
    } catch (error) {
        console.error('Error al actualizar ordenes:', error);
        return -1;
    }finally{
        conn.close();
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

// eliminando las ordenes 
async function ordenesEliminar(total:number): Promise<number> {
    console.log('Eliminando ordenes...');
    let start = new Date().getTime();
    const conn = await connect();
    try {
        for(let i = 1; i <= total; i++){
            await rethink.table('ordenes').get(i.toString()).delete().run(conn);
        }
    } catch (error) {
        console.error('Error al eliminar ordenes:', error);
        return -1;
    }finally{
        conn.close();
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

// exportamos las funciones
export { ordenesInsertar, ordenesConsultar, ordenesConsultarAzar, ordenesActualizar, ordenesEliminar };