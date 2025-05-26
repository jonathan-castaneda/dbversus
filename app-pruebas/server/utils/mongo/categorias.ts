import pruebas from '../pruebas.json'
//insertando nuevas categorias
async function categoriasInsertarMongo(total: number,contaInicial:number): Promise<number> {
    console.log("Iniciando insercion de categorias")
    let start = new Date().getTime();    
    for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
        const ldata = {
            _id: i,// el ID AHORA SI ES NUMERICO
            nombre: "Categoria " + i,
        }
        //agrego usando $fetch        
        await $fetch('/api/mongo/categoria', {
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

//Consultando todas las categorias
async function categoriasConsultarMongo(): Promise<number> {    
    let start = new Date().getTime();
    await $fetch('/api/mongo/categorias', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        onRequestError({ request, options, error }) {
            return -1;
        },
    })
    let end = new Date().getTime();
    let time = end - start;
    return time;       
}

//Consultamos categorias al azar
async function categoriasConsultarAzarMongo(total:number,contaInicial:number): Promise<number> {    
    let start = new Date().getTime();
    for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
        let id = Math.floor(Math.random() * pruebas.categorias.insertar) + 1;
        await $fetch('/api/mongo/categoria/' + id, {
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

async function categoriasActualizarMongo(total:number,contaInicial:number): Promise<number> {
    let start = new Date().getTime();
    for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
        const ldata = {
            _id: i,
            nombre: "Categoria " + i + " Actualizada",
        }
        await $fetch('/api/mongo/categoria/'+i, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldata),
            onRequestError({ request, options, error }) {
                return -1;
            },
        })  
        console.log(ldata.nombre)      
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}

//eliminando las categorias
async function categoriasEliminarMongo(total: number,contaInicial:number): Promise<number> {
    let start = new Date().getTime();
    for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
        await $fetch(`/api/mongo/categoria/${i}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            onRequestError({ request, options, error }) {
                return -1;
            }
        })  
    }
    let end = new Date().getTime();
    let time = end - start;
    return time;
}


export { categoriasInsertarMongo, categoriasConsultarMongo, categoriasConsultarAzarMongo, categoriasActualizarMongo, categoriasEliminarMongo }
