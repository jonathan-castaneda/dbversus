<template>
    <div class="q-ma-md">
        <h6>Pruebas de Rendimiento de Gestores de Bases de Datos</h6>
        <p>El proyecta consta de dos elementos: la apps de pruebas y los contenedores para levantar los gestores. La apps web con el proyecto que realiza las pruebas se encuentra en la carpeta <strong>app-pruebas
        </strong> <br> Dentro encontramos un proyecto de Nuxt en el cual se levanta el backend y el frontend ssr para poder correr las pruebas. </p>

        <p>Luego tenemos las carpetas donde se define los contenedores para levantar los gestores, dentro de la carpeta se encuentra el docker-compose.yml que define como levantar el contenedor y ademas otros archivos que definen aspectos de configuracion necesarios para levantar la imagen de docker</p>
        <p>Para las pruebas de base de datos relacionales se usa Sequelize para optimizarlas, puede ver el ejemplo de oracle que ya esta completo.</p>
        <p>Recuerde que en el docker compose puede modificar los recursos asignados al contenedor, la idea es correr las pruebas con los mismos recursos asignados a los gestores.</p>
        <p>deploy:
          resources:
            limits:
              cpus: '1'
              memory: 1G
            reservations:
              cpus: '1'
              memory: 1G   </p>
    </div>
    
</template>