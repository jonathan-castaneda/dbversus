<template>
    <div>
        <div class="row flex flex-center q-mt-md">
            <div class="text-h4">Pruebas para MySQL</div>
            <div class="q-ml-lg">
                <q-btn @click="realizarPruebas" color="primary">Iniciar</q-btn>
            </div>
        </div>
        <div class="row">
            <p>{{ tiemposInsercion }}</p>
            <p>{{ tiemposConsulta }}</p>
            <p>{{ tiemposActualizacion }}</p>
            <p>{{ tiemposEliminacion }}</p>

        </div>
        
    </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import pruebas from '../server/utils/pruebas.json'

const tiemposInsercion= ref([])
const tiemposConsulta= ref([])
const tiemposActualizacion= ref([])
const tiemposEliminacion= ref([])


function realizarPruebas() {
    //iniciamos con insertar
    categoriasInsertar(pruebas.categorias.insertar)
    
    //ahora procedemos a realizar consultas
    categoriasConsultar()
    categoriasConsultarAzar(pruebas.categorias.aleatorio)

    //Actualizaciones de datos
    categoriasActualizar(pruebas.categorias.actualizar)

    //Consultas de Resumentes o Totales -Avanzadas

    //Eliminacion de datos
    categoriasEliminar(pruebas.categorias.insertar)
}

//insertando nuevas categorias
 function categoriasInsertar(total: number) {
    let start = new Date().getTime();    
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Categoria " + i,
        }
        //agrego usando useFetch
        
        const { data, error } = useFetch('http://localhost:3000/api/mysql/categoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ldata)
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposInsercion.value.push(time);
    
}

//Consultando todas las categorias
function categoriasConsultar() {    
    let start = new Date().getTime();
    const { data, error } = useFetch('http://localhost:3000/api/mysql/categorias', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let end = new Date().getTime();
    let time = end - start;
    tiemposConsulta.value.push(time);        
}

//Consultamos categorias al azar
function categoriasConsultarAzar(total:number) {    
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        let id = Math.floor(Math.random() * pruebas.categorias.insertar) + 1;
        const { data, error } = useFetch('http://localhost:3000/api/mysql/categoria/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposConsulta.value.push(time);    
}

function categoriasActualizar(total:number) {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            nombre: "Categoria " + i + " Actualizada",
        }
        const { data, error } = useFetch('http://localhost:3000/api/mysql/categoria/'+i, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldata)
        })        
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposActualizacion.value.push(time);    
}

//eliminando las categorias
function categoriasEliminar(total:number) {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const { data, error } = useFetch('http://localhost:3000/api/mysql/categoria/'+i, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: i })
        })  
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposEliminacion.value.push(time);    
}




</script>