<template>
  <div>
    <q-toolbar :style="{ backgroundColor: '#F80000' }">
      <q-toolbar-title @click="navigateTo('/')">            
        DB Rendimiento
      </q-toolbar-title>

      <q-tabs inline-label class="text-white shadow-2" align="justify">
        <!-- Botón desplegable: Gestores Relacionales -->
        <q-btn-dropdown color="white text-black" label="Gestores Relacionales">
          <q-list>
            <q-item clickable v-close-popup @click="navigateTo('/mysql')">
              <q-item-section>
                <q-item-label>MySQL</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="navigateTo('/mariadb')">
              <q-item-section>
                <q-item-label>Maria DB</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="navigateTo('/posgresql')">
              <q-item-section>
                <q-item-label>PostgreSQL</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="navigateTo('/sqlserver')">
              <q-item-section>
                <q-item-label>SQL Server</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="navigateTo('/oracle')">
              <q-item-section>
                <q-item-label>Oracle Database</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="navigateTo('/firebird')">
              <q-item-section>
                <q-item-label>FireBird</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <!-- Botón desplegable: Gestores No Relacionales -->
        <q-btn-dropdown color="white text-black" label="Gestores NO Relacionales (No SQL)">
          <q-list>
            <q-item clickable v-close-popup @click="navigateTo('/mongodb')">
              <q-item-section>
                <q-item-label>MongoDB</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="navigateTo('/cassandra')">
              <q-item-section>
                <q-item-label>Cassandra</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="navigateTo('/couchdb')">
              <q-item-section>
                <q-item-label>CouchDB</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="navigateTo('/rethinkdb')">
              <q-item-section>
                <q-item-label>RethinkDB</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-tabs>

      <q-space />
    </q-toolbar>

    <slot></slot>
  </div>
</template>



  
  