<!-- <template>
    <div>
        <h4>RethinkDB</h4>
        <p>Conexión a base de datos</p>
    </div>
</template> -->

<template>
    <div>
      <h1>Estado de la base de datos RethinkDB</h1>
      <p v-if="loading">Cargando...</p>
      <ul v-else-if="tables">
        <li v-for="table in tables" :key="table">{{ table }}</li>
      </ul>
      <p v-else>Error al obtener la lista de tablas.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  const loading = ref(true);
  const tables = ref<string[] | null>(null);
  
  onMounted(async () => {
    try {
      const response = await $fetch<{ tables: string[] }>('api/rethinkdb/verificarTablas');
       tables.value = response.tables;
    console.log(response)
    } catch (error) {
      console.error(error);
    } finally {
       loading.value = false;
     }
  });
  </script>