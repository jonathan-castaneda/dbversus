import pruebas from '../pruebas.json';

async function productosInsertar(total: number,contaInicial:number): Promise<number> { 
    console.log("Iniciando inserción de productos en MongoDB");   
    let start = new Date().getTime();    
    for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
        const ldata = {
            _id: i,
            nombre: "Producto " + i,
            precio: Math.floor(Math.random() * 100) + 1,
            idCategoria: Math.floor(Math.random() * pruebas.categorias.insertar) + 1,
        }
        // Agrego usando $fetch        
        await $fetch('/api/mongo/producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ldata),            
            onRequestError({ request, options, error }) {
                return -1;
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

async function productosConsultar(): Promise<number>  {    
    let start = new Date().getTime();
    await $fetch('/api/mongo/productos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        onRequestError({ request, options, error }) {
            return -1
        },
    })
    let end = new Date().getTime();
    let time = end - start;
    return time;       
}

async function productosConsultarAzar(total:number,contaInicial:number): Promise<number>  {    
    let start = new Date().getTime();
    for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
        let id = Math.floor(Math.random() * pruebas.productos.insertar) + 1;
        await $fetch('/api/mongo/producto/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            onRequestError({ request, options, error }) {
                return -1;
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    return time; 
}

async function productosActualizar(total:number,contaInicial:number): Promise<number>  {
    let start = new Date().getTime();
    for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
        const ldata = {
            _id: i,
            nombre: "Producto " + i + " Actualizado",
            precio: Math.floor(Math.random() * 100) + 1,
            idCategoria: Math.floor(Math.random() * pruebas.categorias.insertar) + 1,
        }

        await $fetch('/api/mongo/producto/'+i, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldata),
            onRequestError({ request, options, error }) {
                return -1;
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

async function productosEliminar(total:number,contaInicial:number): Promise<number>  {
    let start = new Date().getTime();
    for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
        await $fetch('/api/mongo/producto/'+i, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: i }),
        onRequestError({ request, options, error }) {
            return -1;
        }
        })  
    }
    let end = new Date().getTime();
    let time = end - start;
    return time; 
}

export { productosInsertar, productosConsultar, productosConsultarAzar, productosActualizar, productosEliminar };
