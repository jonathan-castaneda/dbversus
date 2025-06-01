
// aca recibira la ip del contenedor
async function insertarCategorias(cantidad: number, contador: number): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/categorias/insertar', {
      method: 'POST',
      body: { cantidad, contador },
    });

    const end = performance.now();
    const time = end - start
    return time;

  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}

async function obtenerCategorias(): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/categorias/consultar', {
      method: 'GET',
    });

    const end = performance.now();
    const time = end - start
    return time;

  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}

async function obtenerCategoriasAzar(cantidad: number): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/categorias/consultarAzar', {
      method: 'POST',
      body: { cantidad }
    });

    const end = performance.now();
    const time = end - start
    return time;

  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}

async function actualizarCategorias(cantidad: number): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/categorias/actualizar', {
      method: 'PUT',
      body: { cantidad }
    });

  
      const end = performance.now();
      const time = end - start
      return time;
   
  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}


async function eliminarCategorias(): Promise<number> {
  try {
    const start = performance.now();
    const response = await $fetch('/api/rethinkdb/categorias/eliminar', {
      method: 'DELETE',
    });

    
      const end = performance.now();
      const time = end - start
      return time;
    
  } catch (error) {
    console.error('Error en fetch:', error);
    return -1;
  }
}


export {
  insertarCategorias,
  obtenerCategorias,
  obtenerCategoriasAzar,
  actualizarCategorias,
  eliminarCategorias
};
