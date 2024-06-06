<template>
    <div>
        <div class="row flex flex-center q-mt-md">
            <div class="text-h4">Pruebas para MySQL</div>
            <div class="q-ml-lg">
                <q-btn @click="realizarPruebas" color="primary">Iniciar</q-btn>
            </div>
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


async function realizarPruebas() {
    //iniciamos con insertar
    await categoriasInsertar(pruebas.categorias.insertar)
    await productosInsertar(pruebas.productos.insertar)
    
    //ahora procedemos a realizar consultas
    await categoriasConsultar()
    await categoriasConsultarAzar(pruebas.categorias.aleatorio)
    await productosConsultar()
    await productosConsultarAzar(pruebas.productos.aleatorio)

    //Actualizaciones de datos
    await categoriasActualizar(pruebas.categorias.actualizar)
    await productosActualizar(pruebas.productos.actualizar)

    //Consultas de Resumentes o Totales -Avanzadas

    //Eliminacion de datos
    await categoriasEliminar(pruebas.categorias.insertar)
    await productosEliminar(pruebas.productos.insertar)
}

//insertando nuevas categorias
 async function categoriasInsertar(total: number) {
    
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
    let start = new Date().getTime();    
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Producto " + i,
            precio: Math.floor(Math.random() * 100) + 1,
            categoria: Math.floor(Math.random() * pruebas.categorias.insertar) + 1,
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


</script>