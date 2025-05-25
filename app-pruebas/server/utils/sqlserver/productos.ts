import pruebas from '../pruebas.json'

async function productosInsertarSqlServer(total: number): Promise<number>  { 
    console.log("Iniciando insercion de productos")   
    let start = new Date().getTime();    
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Producto " + i,
            precio: Math.floor(Math.random() * 100) + 1,
            idCategoria: Math.floor(Math.random() * pruebas.categorias.insertar) + 1,
        }
        //agrego usando $fetch        
        await $fetch('/api/sqlserver/producto', {
            method: 'POST',
            body: ldata,
            onRequestError({ error }) {
                return -1;
            }
        });     
    }
    let end = new Date().getTime();
    let time = end - start;
   return time;
    
}

async function productosConsultarSqlServer(): Promise<number>  {    
    let start = new Date().getTime();
    await $fetch('/api/sqlserver/productos', {
        method: 'GET',
        onRequestError({ error }) {
            return -1;
        }
    });
    let end = new Date().getTime();
    let time = end - start;
    return time;       
}

async function productosConsultarAzarSqlServer(total:number): Promise<number>  {    
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        let id = Math.floor(Math.random() * pruebas.productos.insertar) + 1;
        await $fetch(`/api/sqlserver/producto/${id}`, {
            method: 'GET',
            onRequestError({ error }) {
                return -1;
            }
        });      
    }
    let end = new Date().getTime();
    let time = end - start;
    return time; 
}

async function productosActualizarSqlServer(total:number): Promise<number>  {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Producto " + i + " Actualizado",
            precio: Math.floor(Math.random() * 100) + 1,
            categoria: Math.floor(Math.random() * pruebas.categorias.insertar) + 1,
        }

        await $fetch(`/api/sqlserver/producto/${i}`, {
            method: 'PUT',
            body: ldata,
            onRequestError({ error }) {
                return -1;
            }
        });       
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

async function productosEliminarSqlServer(total:number): Promise<number>  {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        await $fetch(`/api/sqlserver/producto/${i}`, {
            method: 'DELETE',
            body: { id: i },
            onRequestError({ error }) {
                return -1;
            }
        }); 
    }
    let end = new Date().getTime();
    let time = end - start;
    return time; 
}

export { productosInsertarSqlServer, productosConsultarSqlServer, productosConsultarAzarSqlServer, productosActualizarSqlServer, productosEliminarSqlServer }