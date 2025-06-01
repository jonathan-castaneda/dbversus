<template>
  <div>
      <div class="row flex flex-center q-mt-md">
          <div class="text-h4">Pruebas para RethinkDb</div>
          
      </div>
      <div class="row">
          <div class="text-caption col-12 q-ml-md">
              Recuerda que debes tener arrancado el contenedor de RethinkDb levantado con docker y no debe tener datos, solo debe tener la estructura de las tablas.
              Haz clic en iniciar y comenzamos las pruebas, primero insertando, luego actualizando, consultando y eliminando.
              Si vuelves ha hacer pruebas se recomienda que ejecutes docker compose down y luego <strong>docker compose up -d</strong> 
              <p>Recuerda que en el archivo <strong>/RethinkDb/docker-compose.yml</strong> defines la memoria y el CPU asignado al contenedor para las pruebas</p>
          </div>
          <div class="col-12 row q-ml-md">
              <div class="col-2">
                  <div class="text-bold">Pruebas en Categorias</div>
                  Insercion: <strong>{{ pruebas.categorias.insertar }}</strong><br>
                  Actualizacion: <strong>{{ pruebas.categorias.actualizar }}</strong><br>
                  Consulta: <strong>{{ pruebas.categorias.aleatorio }}</strong><br>
              </div>
              <div class="col-2">
                  <div class="text-bold">Pruebas en Productos</div>
                  Insercion: <strong>{{ pruebas.productos.insertar }}</strong><br>
                  Actualizacion: <strong>{{ pruebas.productos.actualizar }}</strong><br>
                  Consulta: <strong>{{ pruebas.productos.aleatorio }}</strong><br>
              </div>
              <div class="col-2">
                  <div class="text-bold">Pruebas en Ordenes</div>
                  Insercion: <strong>{{ pruebas.ordenes.insertar }}</strong><br>
                  Actualizacion: <strong>{{ pruebas.ordenes.actualizar }}</strong><br>
                  Consulta: <strong>{{ pruebas.ordenes.aleatorio }}</strong><br>
                  <!-- Detalle Ordenes: <strong>{{ pruebas.ordenes.detalleoden }}</strong><br> -->
          
              </div>
              <div class="col-3 q-ml-lg">
                <q-input filled v-model="contador" label="Contador de inicio" type="number" class="q-mb-md" style="width: 200px"/>

              <q-btn size="lg" :loading="cargando" @click="realizarPruebas" color="primary">Iniciar Pruebas</q-btn>
              <q-circular-progress
              show-value
              font-size="12px"
              :value="avance"
              size="50px"
              :thickness="0.22"
              color="teal"
              track-color="grey-3"
              class="q-ma-md"
              >
              {{ avance }}%
              </q-circular-progress>
          </div>

          </div>
      </div>
      
      <div class="row q-ml-lg q-mt-md">
          <q-table
          flat bordered
          title="Pruebas sobre Gestor RethinkDb"
          :rows="rows"
          :columns="columns"
          color="primary"
          row-key="name"
          class="col-6"
          
          >            
          </q-table>
         
          <div class="col-2 q-ml-md">
              <div class="text-h6">Errores</div>
              <q-input class="q-my-sm" label="Errores Inserción" outlined v-model="erroresInsercion"  dense>
                  <template v-slot:prepend>
                  <q-icon name="warning" />
                  </template>
              </q-input>
              <q-input class="q-my-sm" label="Errores Consulta" outlined v-model="erroresConsulta"  dense>
                  <template v-slot:prepend>
                  <q-icon name="warning" />
                  </template>
              </q-input>
              <q-input class="q-my-sm" label="Errores Actualización" outlined v-model="erroresActualizacion"  dense>
                  <template v-slot:prepend>
                  <q-icon name="warning" />
                  </template>
              </q-input>
              <q-input class="q-my-sm" label="Errores Eliminación" outlined v-model="erroresEliminacion"  dense>
                  <template v-slot:prepend>
                  <q-icon name="warning" />
                  </template>
              </q-input>
          </div>
          <div class="col-2 q-ml-md">                
              <q-scroll-area style="height: 300px;">
                  <div v-for="n in mensajes" :key="n" class="q-py-xs">
                      {{ n }}
                  </div>
              </q-scroll-area>   
              
          </div>
      </div>
      
  </div>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue'
import { exportFile } from 'quasar'
import type { QTableColumn } from 'quasar'


import pruebas from '../server/utils/pruebas.json'

import {
    insertarCategorias,
    obtenerCategorias,
    obtenerCategoriasAzar,
    actualizarCategorias,
    eliminarCategorias
} from '~/composables/categorias'

import {
    insertarOrdenes,
    obtenerOrdenes,
    obtenerOrdenesAzar,
    actualizarOrdenes,
    eliminarOrdenes
} from '~/composables/ordenes'

import {
    insertarProductos,
    obtenerProductos,
    obtenerProductosAzar,
    actualizarProductos,
    eliminarProductos
} from '~/composables/productos'

import {
    resumenesContarOrdenes,
    resumenesProductosDiarios,
    resumenesProductosFecha,
    resumenesTopten,
    resumenesTotalDiario
} from '~/composables/resumenes'

const contador = ref(0);

// variables reactivas para los tiempos
const tiempoInsertar = ref<number[]>([])
const tiempoObtener = ref<number[]>([])
const tiempoActualizar = ref<number[]>([])
const tiempoEliminar = ref<number[]>([])
const tiemposResumen = ref<number[]>([])


// variables reactivas de errores
const erroresInsercion= ref(0)
const erroresConsulta= ref(0)
const erroresActualizacion= ref(0)
const erroresEliminacion= ref(0)
const erroresResumen = ref(0)
const cargando= ref(false)
const totalPruebas= ref(19)
const mensajes= ref([''])



//propiedad computada del porcentaje de pruebas realizadas
const avance = computed(() => {
  const totalRealizadas = 
    tiempoInsertar.value.length + erroresInsercion.value +
    tiempoObtener.value.length + erroresConsulta.value +
    tiempoActualizar.value.length + erroresActualizacion.value +
    tiempoEliminar.value.length + erroresEliminacion.value + 
    tiemposResumen.value.length + erroresResumen.value;

  return Math.round(totalRealizadas / totalPruebas.value * 100)
})


type RowData = {
  name: string
  total: number
  a: string
  b: string
  c: string
  d: string
  e: string
}

const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Prueba (Tiempos en segundos)',
    align: 'left',
    field: (row: RowData) => row.name,
    format: (val: string) => `${val}`,
    sortable: true
  },
  { name: 'total', label: 'Total', field: 'total' },
  { name: 'a', align: 'center', label: 'A', field: 'a' },
  { name: 'b', label: 'B', field: 'b' },
  { name: 'c', label: 'C', field: 'c' },
  { name: 'd', label: 'D', field: 'd' },
  { name: 'e', label: 'E', field: 'e' },
]


// funcion para formatear los tiempos 
function formatMs(ms: number): number {
  return +Math.min(ms, 9999).toFixed(0); // Máximo 4 dígitos enteros
}


const rows=computed(() => {
  return [
        {
            name: 'Insertar',
            a: formatMs(tiempoInsertar.value[0] ? tiempoInsertar.value[0] : 0),
            b: formatMs(tiempoInsertar.value[1] ? tiempoInsertar.value[1] : 0),
            c: formatMs(tiempoInsertar.value[2] ? tiempoInsertar.value[2] : 0),
            d: formatMs(tiempoInsertar.value[3] ? tiempoInsertar.value[3] : 0),
            e: formatMs(tiempoInsertar.value[4] ? tiempoInsertar.value[4] : 0),
            // total: +(tiempoInsertar.value.reduce((a, b) => a + b, 0) / 1000).toFixed(4)
            total: tiempoInsertar.value.length > 0 ? +(tiempoInsertar.value.reduce((a, b) => a + b, 0) / 1000).toFixed(4) : 0
        }
            ,
        {
             name: 'consultar',
            a: formatMs(tiempoObtener.value[0] ? tiempoObtener.value[0] : 0),
            b: formatMs(tiempoObtener.value[1] ? tiempoObtener.value[1] : 0),
            c: formatMs(tiempoObtener.value[2] ? tiempoObtener.value[2] : 0),
            d: formatMs(tiempoObtener.value[3] ? tiempoObtener.value[3] : 0),
            e: formatMs(tiempoObtener.value[4] ? tiempoObtener.value[4] : 0),
            // total: +(tiempoObtener.value.reduce((a, b) => a + b, 0) / 1000).toFixed(4)
            total: tiempoObtener.value.length > 0 ? +(tiempoObtener.value.reduce((a, b) => a + b, 0) / 1000).toFixed(4) : 0
        },
        {
             name: 'Actualizar',
            a: formatMs(tiempoActualizar.value[0] ? tiempoActualizar.value[0] : 0),
            b: formatMs(tiempoActualizar.value[1] ? tiempoActualizar.value[1] : 0),
            c: formatMs(tiempoActualizar.value[2] ? tiempoActualizar.value[2] : 0),
            d: formatMs(tiempoActualizar.value[3] ? tiempoActualizar.value[3] : 0),
            e: formatMs(tiempoActualizar.value[4] ? tiempoActualizar.value[4] : 0),
            // total: +(tiempoActualizar.value.reduce((a, b) => a + b, 0) / 1000).toFixed(4)
            total: tiempoActualizar.value.length > 0 ? +(tiempoActualizar.value.reduce((a, b) => a + b, 0) / 1000).toFixed(4) : 0

        },
        {
            name: 'Resumenes',
            a: formatMs(tiemposResumen.value[0])? tiemposResumen.value[0].toFixed(2) : 0,
            b: formatMs(tiemposResumen.value[1])? tiemposResumen.value[1].toFixed(2) : 0,
            c: formatMs(tiemposResumen.value[2])? tiemposResumen.value[2].toFixed(2) : 0,
            d: formatMs(tiemposResumen.value[3])? tiemposResumen.value[3].toFixed(2) : 0,
            e: formatMs(tiemposResumen.value[4])? tiemposResumen.value[4].toFixed(2) : 0,
            // total: +(tiemposResumen.value.reduce((a, b) => a + b, 0) / 1000).toFixed(4)
            total: tiemposResumen.value.length > 0 ? +(tiemposResumen.value.reduce((a, b) => a + b, 0) / 1000).toFixed(4) : 0
        },
        {
             name: 'Eliminar',
            a: formatMs(tiempoEliminar.value[0] ? tiempoEliminar.value[0] : 0 ),
            b: formatMs(tiempoEliminar.value[1] ? tiempoEliminar.value[1] : 0 ),
            c: formatMs(tiempoEliminar.value[2] ? tiempoEliminar.value[2] : 0 ),
            d: formatMs(tiempoEliminar.value[3] ? tiempoEliminar.value[3] : 0 ),
            e: formatMs(tiempoEliminar.value[4] ? tiempoEliminar.value[4] : 0 ),
            // total: +(tiempoEliminar.value.length > 0? tiempoEliminar.value.reduce((a,b) => a + b, 0)/ 100 : 0).toFixed(4)
            total: tiempoEliminar.value.length > 0 ? +(tiempoEliminar.value.reduce((a, b) => a + b, 0) / 1000).toFixed(4) : 0

        },
          ]
  
})



async function realizarPruebas() {
  try {
      
  cargando.value=true
  totalPruebas.value=19 // son 19 pruebas a realizar
  let tiempo:number = 0;
  
  //INSERTANDO DATOS
    mensajes.value.push("Iniciando pruebas de inserción") 
    
    // insertando -> categorias
    tiempo = await insertarCategorias(pruebas.categorias.insertar, contador.value)
    tiempo==-1? erroresInsercion.value++: tiempoInsertar.value.push(tiempo);  

    tiempo = await insertarProductos(pruebas.productos.insertar, contador.value)
    tiempo==-1? erroresInsercion.value++: tiempoInsertar.value.push(tiempo); 

    // insertando -> ordenes ====> falta agregar el detalle orden en esta tabla    Argument of type 'number' is not assignable to parameter of type 'never'
    tiempo=await insertarOrdenes(pruebas.ordenes.insertar, contador.value)
    tiempo==-1? erroresInsercion.value++: tiempoInsertar.value.push(tiempo);
  
    mensajes.value.push("Iniciando pruebas de consultas")
  
    //PROCEDEMOS A CONSULTAR LOS DATOS  

    // consultamos categorias y categoriasAzar (25)
    tiempo=await obtenerCategorias()
    tiempo==-1? erroresConsulta.value++: tiempoObtener.value.push(tiempo);
    
    tiempo=await obtenerCategoriasAzar(pruebas.categorias.aleatorio)
    tiempo==-1? erroresConsulta.value++: tiempoObtener.value.push(tiempo);
    
    // consultamos productos y productosAzar(25)
    tiempo=await obtenerProductos()
    tiempo==-1? erroresConsulta.value++: tiempoObtener.value.push(tiempo);

    tiempo=await obtenerProductosAzar(pruebas.productos.aleatorio)
    tiempo==-1? erroresConsulta.value++: tiempoObtener.value.push(tiempo);

    // CONSULTAMOS ORDENES AL AZAR EN EL CASO DE RETHINK EL DETALLEORDEN ESTA DENTRO DE ORDEN
    tiempo=await obtenerOrdenesAzar(pruebas.ordenes.aleatorio)
    tiempo==-1? erroresConsulta.value++: tiempoObtener.value.push(tiempo);

    //ACTUALIZACION DE DATOS
    mensajes.value.push("Iniciando pruebas de actualización")
    
    // actualizamos categorias
    tiempo=await actualizarCategorias(pruebas.categorias.actualizar)
    tiempo==-1? erroresActualizacion.value++: tiempoActualizar.value.push(tiempo);
    
    // actualizamos productos
    tiempo=await actualizarProductos(pruebas.productos.actualizar)
    tiempo==-1? erroresActualizacion.value++: tiempoActualizar.value.push(tiempo);

    // actualizamos ordenes
    tiempo=await actualizarOrdenes(pruebas.ordenes.actualizar)
    tiempo==-1? erroresActualizacion.value++: tiempoActualizar.value.push(tiempo);
    
    //Consultas de Resumentes o Totales -Avanzadas
    mensajes.value.push("Iniciando pruebas de resumenes")

    tiempo=await resumenesContarOrdenes()
    tiempo==-1? erroresConsulta.value++: tiemposResumen.value.push(tiempo);

    tiempo=await resumenesProductosDiarios()
    tiempo==-1? erroresConsulta.value++: tiemposResumen.value.push(tiempo);

    tiempo=await resumenesProductosFecha()
    tiempo==-1? erroresConsulta.value++: tiemposResumen.value.push(tiempo);

    tiempo=await resumenesTotalDiario()
    tiempo==-1? erroresConsulta.value++: tiemposResumen.value.push(tiempo);

    tiempo=await resumenesTopten()
    tiempo==-1? erroresConsulta.value++: tiemposResumen.value.push(tiempo);

    //Eliminacion de datos
    mensajes.value.push("Iniciando pruebas de eliminación")

    // eliminamos tomas las ordenes
    tiempo=await eliminarOrdenes()
    tiempo==-1? erroresEliminacion.value++: tiempoEliminar.value.push(tiempo);

    // eliminamos los productos
    tiempo=await eliminarProductos()
    tiempo==-1? erroresEliminacion.value++: tiempoEliminar.value.push(tiempo);
    
    // eliminamos las categorias
    tiempo=await eliminarCategorias()
    tiempo==-1? erroresEliminacion.value++: tiempoEliminar.value.push(tiempo);

    console.log("Terminaron las pruebas realizadas")
    mensajes.value.push("Terminaron las pruebas realizadas")
    cargando.value=false
  
} catch (error) {
      console.error(error)
  }    
}

</script>
