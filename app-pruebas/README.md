# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Se requiere de node 21.7.3

Recuerda que primero debes levantar los gestores dokerizados de las bases de datos para poder hacer las pruebas.

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev


```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

# PRODUCCION EJECUTANDO LA APP:
Primero se debe dockerizar la apps, para ello se debe ejecutar el siguiente comando:

```bash
# npm
docker build -t eltag:1.1.1 .
```
Luego se sube la imagen a docker hub, y por ultimo se utiliza docker-compose y ahi se definen los recursos asignados a los dos contenedores para correr las pruebas.

Lo ideal seria correr las pruebas para utilizando tres computadoras de forma simultanea, y que las reciba un solo contenedor de base de datos, debemos probar como hacer esa redireccion, o editar una variable de entorno.


## 

```bash
# npm
docker compose up -d

```

# Variables de entorno en DOCKER
HOST_DB para indicar el host de la base de datos