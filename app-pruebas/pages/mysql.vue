<template>
    <div>
        <div class="row flex flex-center q-mt-md">
            <div class="text-h4">Pruebas para MySQL</div>
            <div class="q-ml-lg">
                <q-btn @click="realizarPruebas" color="primary">Iniciar</q-btn>
            </div>
        </div>
        <div class="row">
            <div class="text-caption col-12">
                Recuerda que debes tener arrancado el contenedor de MYSQL levantado con docker y no debe tener datos, solo debe tener la estructura de las tablas.
                Haz clic en iniciar y comenzamos las pruebas, primero insertando, luego actualizando, consultando y eliminando.
                Si vuelves ha hacer pruebas se recomienda que ejecutes docker compose down y luego docker compose up -d
            </div>
            <div class="col-12 text-h6">Resultados de las pruebas:</div>
        </div>
        <div class="row">
            <p >{{ tiemposInsercion }} {{ erroresInsercion }} </p> 
            <p >{{ tiemposConsulta }} {{ erroresConsulta }}</p> 
            <p >{{ tiemposActualizacion }} {{ erroresActualizacion }}</p> 
            <p>{{ tiemposEliminacion }} {{ erroresEliminacion }}</p>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue'
import pruebas from '../server/utils/pruebas.json'

const tiemposInsercion= ref([])
const tiemposConsulta= ref([])
const tiemposActualizacion= ref([])
const tiemposEliminacion= ref([])
const erroresInsercion= ref(0)
const erroresConsulta= ref(0)
const erroresActualizacion= ref(0)
const erroresEliminacion= ref(0)


/*
Categorias y Productos funciona todo bien, 
OJO *****************************
trabajando en ordenesInsertar y detalleOrdenInsertar
*/
async function realizarPruebas() {
    try {
        //iniciamos con insertar
    //await categoriasInsertar(pruebas.categorias.insertar)
    //await productosInsertar(pruebas.productos.insertar)
    
    //await ordenesInsertar(pruebas.ordenes.insertar, pruebas.ordenes.detalleoden)
    await ordenesInsertar(2, 3)
    
    //ahora procedemos a realizar consultas
    //await categoriasConsultar()
    //await categoriasConsultarAzar(pruebas.categorias.aleatorio)
    //await productosConsultar()
    //await productosConsultarAzar(pruebas.productos.aleatorio)

    //Actualizaciones de datos
    //await categoriasActualizar(pruebas.categorias.actualizar)
    //await productosActualizar(pruebas.productos.actualizar)

    //Consultas de Resumentes o Totales -Avanzadas

    //Eliminacion de datos
    //await productosEliminar(pruebas.productos.insertar)
    //await categoriasEliminar(pruebas.categorias.insertar)

    console.log("Terminaron las pruebas realizadas")
} catch (error) {
        console.error(error)
    }

    
}

//insertando nuevas categorias
 async function categoriasInsertar(total: number) {
    console.log("Iniciando insercion de categorias")
    let start = new Date().getTime();    
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Categoria " + i,
        }
        //agrego usando useFetch        
        await useFetch('http://localhost:3000/api/mysql/categoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ldata),            
            onRequestError({ request, options, error }) {
                erroresInsercion.value++
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposInsercion.value.push(time);
    
}

//Consultando todas las categorias
async function categoriasConsultar() {    
    let start = new Date().getTime();
    await useFetch('http://localhost:3000/api/mysql/categorias', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        onRequestError({ request, options, error }) {
            erroresConsulta.value++
        },
    })
    let end = new Date().getTime();
    let time = end - start;
    tiemposConsulta.value.push(time);        
}

//Consultamos categorias al azar
async function categoriasConsultarAzar(total:number) {    
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        let id = Math.floor(Math.random() * pruebas.categorias.insertar) + 1;
        await useFetch('http://localhost:3000/api/mysql/categoria/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            onRequestError({ request, options, error }) {
                erroresConsulta.value++
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposConsulta.value.push(time);    
}

async function categoriasActualizar(total:number) {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Categoria " + i + " Actualizada",
        }
        await useFetch('http://localhost:3000/api/mysql/categoria/'+i, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldata),
            onRequestError({ request, options, error }) {
                erroresActualizacion.value++
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposActualizacion.value.push(time);    
}

//eliminando las categorias
async function categoriasEliminar(total:number) {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        await useFetch('http://localhost:3000/api/mysql/categoria/'+i, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: i }),
        onRequestError({ request, options, error }) {
            erroresEliminacion.value++
        }
        })  
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposEliminacion.value.push(time);    
}

//METODOS CON PRODUCTOS
async function productosInsertar(total: number) { 
    console.log("Iniciando insercion de productos")   
    let start = new Date().getTime();    
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Producto " + i,
            precio: Math.floor(Math.random() * 100) + 1,
            idCategoria: Math.floor(Math.random() * pruebas.categorias.insertar) + 1,
        }
        //agrego usando useFetch        
        await useFetch('http://localhost:3000/api/mysql/producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ldata),            
            onRequestError({ request, options, error }) {
                erroresInsercion.value++
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposInsercion.value.push(time);
    
}

async function productosConsultar() {    
    let start = new Date().getTime();
    await useFetch('http://localhost:3000/api/mysql/productos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        onRequestError({ request, options, error }) {
            erroresConsulta.value++
        },
    })
    let end = new Date().getTime();
    let time = end - start;
    tiemposConsulta.value.push(time);        
}

async function productosConsultarAzar(total:number) {    
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        let id = Math.floor(Math.random() * pruebas.productos.insertar) + 1;
        await useFetch('http://localhost:3000/api/mysql/producto/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            onRequestError({ request, options, error }) {
                erroresConsulta.value++
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposConsulta.value.push(time);    
}

async function productosActualizar(total:number) {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Producto " + i + " Actualizado",
            precio: Math.floor(Math.random() * 100) + 1,
            categoria: Math.floor(Math.random() * pruebas.categorias.insertar) + 1,
        }
        await useFetch('http://localhost:3000/api/mysql/producto/'+i, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldata),
            onRequestError({ request, options, error }) {
                erroresActualizacion.value++
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposActualizacion.value.push(time);    
}

async function productosEliminar(total:number) {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        await useFetch('http://localhost:3000/api/mysql/producto/'+i, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: i }),
        onRequestError({ request, options, error }) {
            erroresEliminacion.value++
        }
        })  
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposEliminacion.value.push(time);    
}
//FIN DE PRODUCTOS

//Metodos para las ordenes

async function ordenesInsertar(total:number, totaldetalle:number){
    console.log("Iniciando insercion de ordenes")
    let start = new Date().getTime();
    for (let conta=1; conta<=total; conta ++){
        let anio = new Date().getFullYear();
        //mes es un numero del 1 al 12
        let mes = Math.floor(Math.random() * 12)+1;
        let lfecha: string = anio +","+ mes + "," + Math.floor(Math.random() * 28 + 1);
        const ldata = {
                id: conta,
                fecha:lfecha,
                total: Math.floor(Math.random() * 100) + 1,
        }
        //agrego usando useFetch        
        await useFetch('http://localhost:3000/api/mysql/orden', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ldata),
                onRequestError({ request, options, error }) {
                    erroresInsercion.value++
                },
                onResponse({ response }) {
                    //detalleOrdenInsertar(totaldetalle)
                },                       
                
            })
            
        //ahora vienen los detalles de cada orden
        detalleOrdenInsertar(conta, totaldetalle)
    }//fin del for del conta de las ordenes
   
    let end = new Date().getTime();
    let time = end - start;
    tiemposInsercion.value.push(time);

}

async function detalleOrdenInsertar(idOrden: number, totaldetalle: number){   
                //Ahora Agregamos los detalles de la orden los cuales serán segun el totaldetalle
                for (let j = 1; j <= totaldetalle; j++) {
                    const ldatadetalle = {                        
                        idorden: idOrden,
                        idproducto: Math.floor(Math.random() * pruebas.productos.insertar) + 1,
                        cantidad: Math.floor(Math.random() * 10) + 1,
                        precio: Math.floor(Math.random() * 100) + 1,
                    }
                    //agrego usando useFetch        
                    await useFetch('http://localhost:3000/api/mysql/detalleorden', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(ldatadetalle),            
                        onRequestError({ request, options, error }) {
                            erroresInsercion.value++
                        },
                    })        
                }

               
     


}


//Fin de las ordenes


</script>