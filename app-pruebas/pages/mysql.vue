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

        </div>
        
    </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'

const tiemposInsercion= ref([])
const tiemposConsulta= ref([])

function realizarPruebas() {
    //categoriasInsertar()
    //categoriasConsultar()
    categoriasConsultarAzar()
}

//insertando 50 categorias
async function categoriasInsertar() {
    let start = new Date().getTime();    
    for (let i = 1; i <= 50; i++) {
        const ldata = {
            id: i,
            nombre: "Categoria " + i,
        }
        //agrego usando useFetch
        
        const { data, error } = await useFetch('http://localhost:3000/api/mysql/categoria', {
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

//Consultando las 50 categorias
async function categoriasConsultar() {
    let start = new Date().getTime();
    const { data, error } = await useFetch('http://localhost:3000/api/mysql/categorias', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let end = new Date().getTime();
    let time = end - start;
    tiemposConsulta.value.push(time);    
}

//Consultamos 25 categorias al azar (min 1, max 50)
async function categoriasConsultarAzar() {
    let start = new Date().getTime();
    for (let i = 1; i <= 25; i++) {
        let id = Math.floor(Math.random() * 50) + 1;
        const { data, error } = await useFetch('http://localhost:3000/api/mysql/categoria/' + id, {
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




</script>