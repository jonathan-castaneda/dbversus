import { connect, rethink } from './rethinkdb';

// insertando nuevas productos 
async function productosInsertar(total:number): Promise<number> {
    console.log('Insertando productos...');
    let start = new Date().getTime();
    const conn = await connect();
    try {
        for(let i = 1; i <= total; i++){
            const ldata = {
                id: i,
                nombre: `Producto ${i}`
            };
            await rethink.table('productos').insert(ldata).run(conn);
        }
    } catch (error) {
        console.error('Error al insertar productos:', error);
        return -1;
    }finally{
        conn.close();
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

// consultando todas las productos 
async function productosConsultar(): Promise<number> {
    console.log('Consultando productos...');
    let start = new Date().getTime();
    const conn = await connect();
    try {
        await rethink.table('productos').run(conn);
    } catch (error) {
        console.error('Error al consultar productos:', error);
        return -1;
    }finally{
        conn.close();
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

// consultando productos al azar
async function productosConsultarAzar(total:number): Promise<number> {
    console.log('Consultando productos al azar...');
    let start = new Date().getTime();
    const conn = await connect();
    try {
        for(let i = 1; i <= total; i++){
            let id = Math.floor(Math.random() * total) + 1;
            // el id debe de ser string o number ??
            await rethink.table('productos').get(id.toString()).run(conn);
        }
    } catch (error) {
        console.error('Error al consultar productos al azar:', error);
        return -1;
    }finally{
        conn.close();
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

// actualizamos las productos 
async function productosActualizar(total:number): Promise<number> {
    console.log('Actualizando productos...');
    let start = new Date().getTime();
    const conn = await connect();
    try {
        for(let i = 1; i <= total; i++){
            const ldata = {
                nombre: `Producto ${i} actualizado`
            };
            await rethink.table('productos').get(i.toString()).update(ldata).run(conn);
        }
    } catch (error) {
        console.error('Error al actualizar productos:', error);
        return -1;
    }finally{
        conn.close();
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

// eliminando las productos 
async function productosEliminar(total:number): Promise<number> {
    console.log('Eliminando productos...');
    let start = new Date().getTime();
    const conn = await connect();
    try {
        for(let i = 1; i <= total; i++){
            await rethink.table('productos').get(i.toString()).delete().run(conn);
        }
    } catch (error) {
        console.error('Error al eliminar productos:', error);
        return -1;
    }finally{
        conn.close();
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

// exportamos las funciones
export { productosInsertar, productosConsultar, productosConsultarAzar, productosActualizar, productosEliminar };