async function resumenesContarOrdenes():  Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/resumenes/contadorOrdenes', {
        method: 'GET',
    });

    const end = performance.now();
    const time = end - start
    return Math.min(time, 9999);

  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }

}

async function resumenesProductosDiarios():  Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/resumenes/productosDiarios',{
        method: 'GET',
    });
    
    const end = performance.now();
    const time = end - start
    return Math.min(time, 9999);

  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}

async function resumenesProductosFecha():  Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/resumenes/productosDiariosFecha', {
        method: 'GET'
    });
    
  
    const end = performance.now();
    const time = end - start
    return Math.min(time, 9999);

  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}

async function resumenesTopten():  Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/resumenes/topTen', {
        method: 'GET'
    });
    
    const end = performance.now();
    const time = end - start
    return Math.min(time, 9999);

  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}

async function resumenesTotalDiario():  Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/resumenes/totalDiario', {
        method: 'GET'
    });
    
    const end = performance.now();
    const time = end - start
    return Math.min(time, 9999);

  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}

export {
    resumenesContarOrdenes,
    resumenesProductosDiarios,
    resumenesProductosFecha,
    resumenesTopten,
    resumenesTotalDiario
}