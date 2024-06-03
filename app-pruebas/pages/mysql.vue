<template>
    <div>
        <div class="row flex flex-center q-mt-md">
            <div class="text-h4">Pruebas para MySQL</div>
            <div class="q-ml-lg">
                <q-btn @click="categoriasInsertar" color="primary">Iniciar</q-btn>
            </div>
            
            
        </div>
        <div class="row">
            {{ tiemposInsercion }}

        </div>
        
    </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'

const tiemposInsercion= ref([])


//insertando 50 categorias
function categoriasInsertar() {
    let start = new Date().getTime();    
    for (let i = 0; i < 50; i++) {
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




</script>