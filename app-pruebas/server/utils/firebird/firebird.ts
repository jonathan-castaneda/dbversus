import pruebas from '../pruebas.json'
//insertando nuevas categorias
async function categoriasInsertar(total: number): Promise<number> {
    console.log("Iniciando insercion de categorias")
    let start = new Date().getTime();    
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Categoria " + i,
        }
        //agrego usando $fetch        
        await $fetch('http://localhost:3000/api/firebird/categoria', {
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
async function categoriasConsultar(): Promise<number> {
    let start = new Date().getTime();
    
    try {
        // Realizar la solicitud GET
        const response = await $fetch('http://localhost:3000/api/firebird/categorias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Verificar si la respuesta fue exitosa (código 200)
        if (!response || response.error) {
            console.error('Error en la respuesta:', response ? response.error : 'Sin respuesta');
            return -1; // Si hay un error, retorna -1
        }

    } catch (error) {
        // Captura cualquier error relacionado con la solicitud
        console.error('Error en la solicitud fetch:', error);
        return -1; // Si ocurre un error, retorna -1
    }

    let end = new Date().getTime();
    let time = end - start; // Calcula el tiempo de la solicitud en milisegundos
    return time; // Devuelve el tiempo de la consulta en milisegundos
}


//Consultamos categorias al azar
async function categoriasConsultarAzar(total:number): Promise<number> {    
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        let id = Math.floor(Math.random() * pruebas.categorias.insertar) + 1;
        await $fetch('http://localhost:3000/api/firebird/categoria/' + id, {
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

async function categoriasActualizar(total:number): Promise<number> {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Categoria " + i + " Actualizada",
        }
        await $fetch('http://localhost:3000/api/firebird/categoria/'+i, {
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

//eliminando las categorias
async function categoriasEliminar(total:number): Promise<number> {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        await $fetch('http://localhost:3000/api/firebird/categoria/'+i, {
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

export { categoriasInsertar, categoriasConsultar, categoriasConsultarAzar, categoriasActualizar, categoriasEliminar }