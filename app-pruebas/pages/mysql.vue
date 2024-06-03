<template>
    <div>
        <div class="row flex flex-center q-mt-md">
            <div class="text-h4">Pruebas para MySQL</div>
            <div class="q-ml-lg">
                <q-btn @click="categoriasInsertarMedir" color="primary">Iniciar</q-btn>
            </div>
            
            
        </div>
        <div class="row">
            {{ tiempos }}
        </div>
        
    </div>
</template>

<script setup>
import { ref} from 'vue'

const tiempos= ref([])

//funciones que realizan las pruebas
//prueba de inserción de datos
//se hara una insercion de 100 registros que corresponden a las Categorias
//se invoca la api de categorias post para insertar los datos
function categoriasInsertar(){
    console.log("Insertando datos");
    for (let i = 0; i < 100; i++) {
        const ldata = {
            id: i,
            nombre: "Categoria " + i,
        }
        //agrego usando useFetch
        const { data, error } = useFetch('http://localhost:3000/api/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ldata)
        })
        
    }
}

//igual que el metodo categoriasInsertar pero se mide el tiempo de respuesta de cada insercion 
//y se imprime en consola el tiempo que ha tomado cada insersion, se usa una variable para guardar el tiempo
//y se imprime en consola
function categoriasInsertarMedir(){
    console.log("Insertando datos");
    for (let i = 0; i < 50; i++) {
        const ldata = {
            id: i,
            nombre: "Categoria " + i,
        }
        //agrego usando useFetch
        var start = new Date().getTime();
        const { data, error } = useFetch('http://localhost:3000/api/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ldata)
        })
        var end = new Date().getTime();
        var time = end - start;
        tiempos.value.push(time);
    }
}




</script>