import pruebas from '../pruebas.json';

async function categoriasInsertarSqlServer(total: number): Promise<number> {
    console.log("Iniciando inserción de categorías");
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Categoría " + i,
        };
        try {
            await fetch('http://localhost:3000/api/sqlserver/categoria', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ldata)
            });
        } catch (error) {
            console.error(`Error en la inserción de categoría ${i}:`, error);
        }
    }
    let end = new Date().getTime();
    return end - start;
}

async function categoriasConsultarSqlServer(): Promise<number> {
    let start = new Date().getTime();
    try {
        await fetch('http://localhost:3000/api/sqlserver/categorias', { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error al consultar categorías:", error);
    }
    let end = new Date().getTime();
    return end - start;
}

async function categoriasConsultarAzarSqlServer(total: number): Promise<number> {
    let start = new Date().getTime();
    if (!pruebas?.categorias?.insertar || pruebas.categorias.insertar <= 0) {
        console.error("Error: No hay registros en pruebas.categorias.insertar");
        return -1;
    }
    for (let i = 1; i <= total; i++) {
        let id = Math.floor(Math.random() * pruebas.categorias.insertar) + 1;
        try {
            await fetch(`http://localhost:3000/api/sqlserver/categoria/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error(`Error al consultar categoría ${id}:`, error);
        }
    }
    let end = new Date().getTime();
    return end - start;
}

async function categoriasEliminarSqlServer(total: number): Promise<number> {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        try {
            await fetch(`http://localhost:3000/api/sqlserver/categoria/${i}`, { 
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error(`Error al eliminar categoría ${i}:`, error);
        }
    }
    let end = new Date().getTime();
    return end - start;
}

async function categoriasActualizarSqlServer(total: number): Promise<number> {
    console.log("Iniciando actualización de categorías");
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            nombre: "Categoría Actualizada " + i
        };
        try {
            await fetch(`http://localhost:3000/api/sqlserver/categoria/${i}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ldata)
            });
        } catch (error) {
            console.error(`Error actualizando categoría ${i}:`, error);
        }
    }
    let end = new Date().getTime();
    return end - start;
}


export { categoriasInsertarSqlServer, categoriasConsultarSqlServer, categoriasConsultarAzarSqlServer, categoriasEliminarSqlServer, categoriasActualizarSqlServer };