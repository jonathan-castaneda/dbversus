<template>
    <div>
        <div class="row flex flex-center q-mt-md">
            <div class="text-h4">Pruebas para MySQL</div>
            
        </div>
        <div class="row">
            <div class="text-caption col-12">
                Recuerda que debes tener arrancado el contenedor de MYSQL levantado con docker y no debe tener datos, solo debe tener la estructura de las tablas.
                Haz clic en iniciar y comenzamos las pruebas, primero insertando, luego actualizando, consultando y eliminando.
                Si vuelves ha hacer pruebas se recomienda que ejecutes docker compose down y luego docker compose up -d
            </div>
            <div class="col-12">
                <div class="row ">
                    <div class="col-2 q-mx-sm">
                        <div >Pruebas en Categorias</div>
                        <q-input class="q-my-sm" label="Categorias Inserción" filled v-model="pruebas.categorias.insertar"  dense>
                            <template v-slot:prepend>
                            <q-icon name="done" />
                            </template>
                        </q-input>
                        <q-input class="q-my-sm" label="Categorias Actualizar" filled v-model="pruebas.categorias.actualizar"  dense>
                            <template v-slot:prepend>
                            <q-icon name="done" />
                            </template>
                        </q-input>
                        <q-input class="q-my-sm" label="Categorias Consulta" filled v-model="pruebas.categorias.aleatorio"  dense>
                            <template v-slot:prepend>
                            <q-icon name="done" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-2 q-mx-sm">
                        <div>Pruebas en Productos</div>
                        <q-input class="q-my-sm" label="Productos Inserción" filled v-model="pruebas.productos.insertar"  dense>
                            <template v-slot:prepend>
                            <q-icon name="done" />
                            </template>
                        </q-input>
                        <q-input class="q-my-sm" label="Productos Actualizar" filled v-model="pruebas.productos.actualizar"  dense>
                            <template v-slot:prepend>
                            <q-icon name="done" />
                            </template>
                        </q-input>
                        <q-input class="q-my-sm" label="Productos Consulta" filled v-model="pruebas.productos.aleatorio"  dense>
                            <template v-slot:prepend>
                            <q-icon name="done" />
                            </template>
                        </q-input>
                
                    </div>
                    <div class="col-2 q-mx-sm">
                        <div>Pruebas en Ordenes</div>
                        <q-input class="q-my-sm" label="Ordenes Inserción" filled v-model="pruebas.ordenes.insertar"  dense>
                            <template v-slot:prepend>
                            <q-icon name="done" />
                            </template>
                        </q-input>
                        <q-input class="q-my-sm" label="Ordenes Actualizar" filled v-model="pruebas.ordenes.actualizar"  dense>
                            <template v-slot:prepend>
                            <q-icon name="done" />
                            </template>
                        </q-input>
                        <q-input class="q-my-sm" label="Ordenes Consulta" filled v-model="pruebas.ordenes.aleatorio"  dense>
                            <template v-slot:prepend>
                            <q-icon name="done" />
                            </template>
                        </q-input>
                        
                    </div>
                    <div class="col-2 q-mx-sm">
                        <div>.</div>
                        <q-input class="q-my-sm" label="Detalle Ordenes" filled v-model="pruebas.ordenes.detalleoden"  dense>
                            <template v-slot:prepend>
                            <q-icon name="done" />
                            </template>
                        </q-input>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
            <div class="col-3 q-ml-lg">
                <q-btn :loading="cargando" @click="realizarPruebas" color="primary">Iniciar Pruebas</q-btn>
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
        
        <div class="row q-ml-lg">
            <q-table
            flat bordered
            title="Pruebas sobre Gestor MySQL"
            :rows="rows"
            :columns="columns"
            color="primary"
            row-key="name"
            class="col-6"
            
            >
            <template v-slot:top-right>
                <q-btn
                color="primary"
                icon-right="archive"
                label="Exportar a csv"
                no-caps
                @click="exportTable"
                />
            </template>
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
                
                
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue'
import { exportFile, useQuasar } from 'quasar'

import pruebas from '../server/utils/pruebas.json'

const $q = useQuasar()


const tiemposInsercion= ref([])
const tiemposConsulta= ref([ ])
const tiemposActualizacion= ref([ ])
const tiemposResumen= ref([ ])
const tiemposEliminacion= ref([])
const erroresInsercion= ref(0)
const erroresConsulta= ref(0)
const erroresActualizacion= ref(0)
const erroresEliminacion= ref(0)
const cargando= ref(false)
const totalPruebas= ref(19)

//propiedad computada del porcentaje de pruebas realizadas
const avance = computed(() => {
    return Math.round((tiemposInsercion.value.length + tiemposConsulta.value.length + tiemposActualizacion.value.length + tiemposEliminacion.value.length + tiemposResumen.value.length) / totalPruebas.value * 100)
})

//propiedades para la tabla
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Prueba (Tiempos en mili segundos)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'total', label: 'Total', field: 'total' },
  { name: 'a', align: 'center', label: 'A', field: 'a' },
  { name: 'b', label: 'B', field: 'b' },
  { name: 'c', label: 'C', field: 'c' },
  { name: 'd', label: 'D', field: 'd' },
  { name: 'e', label: 'E', field: 'e' },
  
]


const rows=computed(() => {
    return [
            {
                name: 'Insertar',
                a: tiemposInsercion.value[0]? tiemposInsercion.value[0]: 0,
                b: tiemposInsercion.value[1]? tiemposInsercion.value[1]: 0,
                c: tiemposInsercion.value[2]? tiemposInsercion.value[2]: 0,
                d: tiemposInsercion.value[3]? tiemposInsercion.value[3]: 0,
                e: tiemposInsercion.value[4]? tiemposInsercion.value[4]: 0, 
                total: tiemposInsercion.value.reduce((a, b) => a + b, 0)  
            },
                {
                    name: 'Consultar',
                    a: tiemposConsulta.value[0]? tiemposConsulta.value[0]: 0,
                    b: tiemposConsulta.value[1]? tiemposConsulta.value[1]: 0,
                    c: tiemposConsulta.value[2]? tiemposConsulta.value[2]: 0,
                    d: tiemposConsulta.value[3]? tiemposConsulta.value[3]: 0,
                    e: tiemposConsulta.value[4]? tiemposConsulta.value[4]: 0,
                    total: tiemposConsulta.value.reduce((a, b) => a + b, 0)  
                },
                {
                    name: 'Actualizar',
                    a: tiemposActualizacion.value[0]? tiemposActualizacion.value[0]: 0,
                    b: tiemposActualizacion.value[1]? tiemposActualizacion.value[1]: 0,
                    c: tiemposActualizacion.value[2]? tiemposActualizacion.value[2]: 0,
                    d: tiemposActualizacion.value[3]? tiemposActualizacion.value[3]: 0,
                    e: tiemposActualizacion.value[4]? tiemposActualizacion.value[4]: 0,  
                    total: tiemposActualizacion.value.reduce((a, b) => a + b, 0)  
                },
                {
                    name: 'Resumenes',
                    a: tiemposResumen.value[0]? tiemposResumen.value[0]: 0,
                    b: tiemposResumen.value[1]? tiemposResumen.value[1]: 0,
                    c: tiemposResumen.value[2]? tiemposResumen.value[2]: 0,
                    d: tiemposResumen.value[3]? tiemposResumen.value[3]: 0,
                    e: tiemposResumen.value[4]? tiemposResumen.value[4]: 0,
                    total: tiemposResumen.value.reduce((a, b) => a + b, 0)
                },
                {
                    name: 'Eliminar',
                    a: tiemposEliminacion.value[0]? tiemposEliminacion.value[0]: 0,
                    b: tiemposEliminacion.value[1]? tiemposEliminacion.value[1]: 0,
                    c: tiemposEliminacion.value[2]? tiemposEliminacion.value[2]: 0,
                    d: tiemposEliminacion.value[3]? tiemposEliminacion.value[3]: 0,
                    e: tiemposEliminacion.value[4]? tiemposEliminacion.value[4]: 0,
                    total: tiemposEliminacion.value.reduce((a, b) => a + b, 0)
                },
            ]

    
})


function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

function exportTable () {
        // naive encoding to csv format
        const rows2= rows.value

        const content = [columns.map(col => wrapCsvValue(col.label))].concat(
          rows2.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[ col.field === void 0 ? col.name : col.field ],
            col.format,
            row
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      }

/*
Categorias y Productos funciona todo bien, 
OJO *****************************
trabajando en ordenesInsertar y detalleOrdenInsertar
*/
async function realizarPruebas() {
    try {
    cargando.value=true
    totalPruebas.value=19 // son 19 pruebas a realizar

        //iniciamos con insertar
    await categoriasInsertar(pruebas.categorias.insertar)
    await productosInsertar(pruebas.productos.insertar)    
    await ordenesInsertar(pruebas.ordenes.insertar, pruebas.ordenes.detalleoden)
    
    
    //ahora procedemos a realizar consultas
    await categoriasConsultar()
    await categoriasConsultarAzar(pruebas.categorias.aleatorio)
    await productosConsultar()
    await productosConsultarAzar(pruebas.productos.aleatorio)

    // CONSULTAMOS ORDENES AL AZAR DEBEMOS TRAER LOS DATOS DE ORDEN Y SUS DETALLES    
    await ordenesConsultarAzar(pruebas.ordenes.aleatorio)
    

    //Actualizaciones de datos
    await categoriasActualizar(pruebas.categorias.actualizar)
    await productosActualizar(pruebas.productos.actualizar)
    await ordenesActualizar(pruebas.ordenes.actualizar)
    
    //Consultas de Resumentes o Totales -Avanzadas
    await resumenesContarOrdenes()
    await resumenesProductos()
    await resumenesProductosFecha()
    await resumenesTotalDiario()
    await resumenesTopten()

    //Eliminacion de datos
    await ordenesEliminar(pruebas.ordenes.insertar)
    await productosEliminar(pruebas.productos.insertar)
    await categoriasEliminar(pruebas.categorias.insertar)

    console.log("Terminaron las pruebas realizadas")
    cargando.value=false
    //muestro un notify
    $q.notify({
        message: 'Pruebas realizadas con éxito',
        color: 'positive',
        icon: 'thumb_up'
    })
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
                        //idproducto: Math.floor(Math.random() * (pruebas.productos.insertar/2)) + 1,
                        idproducto:j,
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

async function ordenesConsultarAzar(total:number) {    
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        let id = Math.floor(Math.random() * pruebas.ordenes.insertar) + 1;
        await useFetch('http://localhost:3000/api/mysql/orden/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },           
            onRequestError({ request, options, error }) {
                erroresConsulta.value++
            },
        })
        //ahora consultamos los detalles de la orden
        await useFetch('http://localhost:3000/api/mysql/detalleorden/' + id, {
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

async function ordenesActualizar(total:number) {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            fecha: new Date().toISOString(),
            total: Math.floor(Math.random() * 100) + 1,
        }
        await useFetch('http://localhost:3000/api/mysql/orden/'+i, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldata),
            onRequestError({ request, options, error }) {
                erroresActualizacion.value++
            },
        })
        //ahora actualizamos los detalles de la orden, primero hacemos GET y traemos todos los detalles
        // luego le multiplicamos por dos la cantidad y enviamos las actualizaciones de cada detalle
        let datos = await useFetch('http://localhost:3000/api/mysql/detalleorden/' + i, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },           
            onRequestError({ request, options, error }) {
                erroresConsulta.value++
            },
        })       
        //convertir a json datos.data
        let ldatos = datos.data.value.data
        //console.log(ldatos)
        for (let j = 0; j < ldatos.length; j++) {
            const ldatadetalle = {                        
                idorden: i,
                idproducto: ldatos[j].idproducto,
                cantidad: ldatos[j].cantidad * 2,
                precio: ldatos[j].precio,
            }
            //console.log(ldatadetalle)
            //ahora invocamos PUT detalleorden para enviar los cambios
            await useFetch('http://localhost:3000/api/mysql/detalleorden/' + ldatos[j].idorden + '/'+  ldatos[j].idproducto  , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ldatadetalle),            
                onRequestError({ request, options, error }) {
                    erroresActualizacion.value++
                },
            })     
        } //fin del for de los detalles        

        
    }
    let end = new Date().getTime();
    let time = end - start;
    tiemposActualizacion.value.push(time);    
}

async function ordenesEliminar(total:number) {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        //primero eliminamos los detalles de la orden
        await useFetch('http://localhost:3000/api/mysql/detalleorden/'+i, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: i }),
            onRequestError({ request, options, error }) {
                erroresEliminacion.value++
            }
        })

        await useFetch('http://localhost:3000/api/mysql/orden/'+i, {
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

//Fin de las ordenes


//consultas de resumenes o totales
async function resumenesContarOrdenes() {
    let start = new Date().getTime();
    await useFetch('http://localhost:3000/api/mysql/resumenes/countordenes', {
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
    tiemposResumen.value.push(time);
}

async function resumenesProductos() {
    let start = new Date().getTime();
    await useFetch('http://localhost:3000/api/mysql/resumenes/productosdiarios', {
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
    tiemposResumen.value.push(time);
}

async function resumenesProductosFecha() {
    let start = new Date().getTime();
    let anio = new Date().getFullYear();        
    let mes = Math.floor(Math.random() * 12)+1;
    let dia = Math.floor(Math.random() * 28 + 1);
    let fecha= anio + "-" + mes + "-" + dia;

    await useFetch('http://localhost:3000/api/mysql/resumenes/productosdiariosfecha?fecha=' + fecha, {
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
    tiemposResumen.value.push(time);
}

async function resumenesTotalDiario() {
    let start = new Date().getTime();
    await useFetch('http://localhost:3000/api/mysql/resumenes/totaldiario', {
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
    tiemposResumen.value.push(time);
}

async function resumenesTopten() {
    let start = new Date().getTime();
    await useFetch('http://localhost:3000/api/mysql/resumenes/topten', {
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
    tiemposResumen.value.push(time);
}


</script>