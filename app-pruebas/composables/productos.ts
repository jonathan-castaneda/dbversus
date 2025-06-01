
  // aca recibira la ip del contenedor
  async function insertarProductos(cantidad: number, contador:number): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/productos/insertar', {
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

  async function obtenerProductos(): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/productos/consultar', {
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

  async function obtenerProductosAzar(cantidad: number): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/productos/consultarAzar', {
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

  async function actualizarProductos(cantidad: number): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/productos/actualizar', {
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


  async function eliminarProductos(): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/productos/eliminar', {
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
    insertarProductos,
    obtenerProductos,
    obtenerProductosAzar,
    actualizarProductos,
    eliminarProductos
  };
