<template>
    <div>
      <q-toolbar class="bg-secondary">
          <q-toolbar-title @click="navigateTo('/')">            
            DB Rendimiento
          </q-toolbar-title>
          <q-tabs inline-label
        class="text-white shadow-2" align="justify" >
        <q-tab @click="navigateTo('/mysql')" icon="description" label="Mysql" />
        <q-tab @click="navigateTo('/mariadb')" icon="database" label="MariaDB" />
        <q-tab icon="save" label="PostgreSQL" />
        <q-tab icon="folder" label="Oracle" />
        <q-tab icon="cloud" label="MongoDB" />
        <q-tab icon="task" label="Cassandra" />
        <q-tab icon="description" label="CouchDB" />
      </q-tabs>
        <q-space />
    </q-toolbar>
    <slot></slot>
    </div>
    
  </template>



  
  