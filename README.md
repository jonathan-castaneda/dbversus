# dbversus
Prueba de Rendimiento de Bases de Datos. Primero debes levantar los gestores de bases de datos con docker compose, antes de hacer levantar la apps de pruebas debes levantar los contenedores de las bases de datos.

## Apps de pruebas
tenemos una carpeta llamada `app-pruebas` que contiene las pruebas, es un proyecto de nuxt 3, para ejecutarlo se debe de tener instalado node 21.7.3 y ejecutar los siguientes comandos:

```bash

cd app-pruebas

npm install

npm run dev

```

## Carpeta de base de datos
para cada gestor de base de base se tiene el script inicial del esquema y se tiene tambien el archivo docker-compose.yml para así levantar el gestor de base de datos.

para levantar los gestores se debe de ejecutar el siguiente comando:

```bash
docker compose -f ./oracle/docker-compose.yml up -d
```

#PARA PRODUCCION 
