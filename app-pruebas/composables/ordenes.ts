  // aca recibira la ip del contenedor
  async function insertarOrdenes(cantidad: number, contador:number): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/ordenes/insertar', {
      method: 'POST',
      body: { cantidad, contador },      
    });

   
      const end = performance.now();
      const time = end - start
      return Math.min(time, 9999);
   
  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}

  async function obtenerOrdenes(): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/ordenes/consultar', {
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

  async function obtenerOrdenesAzar(cantidad: number): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/ordenes/consultarAzar', {
      method: 'POST',
      body: { cantidad }
    });


      const end = performance.now();
      const time = end - start
      return Math.min(time, 9999);
    
  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}

  async function actualizarOrdenes(cantidad: number): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/ordenes/actualizar', {
      method: 'PUT',
      body: { cantidad }
    });

   
      const end = performance.now();
      const time = end - start
      return Math.min(time, 9999);
    
  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}


  async function eliminarOrdenes(): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/ordenes/eliminar', {
      method: 'DELETE',
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
    insertarOrdenes,
    obtenerOrdenes,
    obtenerOrdenesAzar,
    actualizarOrdenes,
    eliminarOrdenes
  };
