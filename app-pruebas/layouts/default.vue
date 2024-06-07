<template>
    <div>
      <q-toolbar class="bg-secondary">
          <q-toolbar-title @click="navigateTo('/')">            
            DB Rendimiento
          </q-toolbar-title>
          <q-tabs inline-label
        class="text-white shadow-2" align="justify" >
        <q-tab @click="navigateTo('/mysql')" label="Mysql" class="text-capitalize" />
        <q-tab @click="navigateTo('/mariadb')"  label="MariaDB" class="text-capitalize" />
        <q-tab  label="PostgreSQL" class="text-capitalize" />
        <q-tab  label="SQLite" class="text-capitalize" />
        <q-tab  label="SQL Server" class="text-capitalize" />
        <q-tab  label="FireBird" class="text-capitalize" />
        <q-tab  label="Oracle" class="text-capitalize" />
        <q-tab  label="MongoDB" class="text-capitalize" />
        <q-tab  label="Cassandra" class="text-capitalize" />
        <q-tab  label="CouchDB" class="text-capitalize" />
        <q-tab  label="RethinkDB" class="text-capitalize" />
      </q-tabs>
        <q-space />
    </q-toolbar>
    <slot></slot>
    </div>
    
  </template>



  
  