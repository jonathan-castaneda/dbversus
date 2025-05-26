// Consultas de resumenes o totales desde la API de MongoDB

async function resumenesContarOrdenesMongo(): Promise<number> {
    let start = new Date().getTime();
    await $fetch('/api/mongo/resumenes/countordenes', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        onRequestError({ request, options, error }) {
            return -1;
        },
    });
    let end = new Date().getTime();
    return end - start;
}

async function resumenesProductosMongo(): Promise<number> {
    let start = new Date().getTime();
    await $fetch('/api/mongo/resumenes/productosdiarios', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        onRequestError({ request, options, error }) {
            return -1;
        },
    });
    let end = new Date().getTime();
    return end - start;
}

async function resumenesProductosFechaMongo(): Promise<number> {
    let start = new Date().getTime();
    let anio = new Date().getFullYear();        
    let mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    let dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    let fecha = `${anio}-${mes}-${dia}`;

    await $fetch(`/api/mongo/resumenes/productosdiariosfecha?fecha=${fecha}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        onRequestError({ request, options, error }) {
            return -1;
        },
    });
    let end = new Date().getTime();
    return end - start;
}

async function resumenesTotalDiarioMongo(): Promise<number> {
    let start = new Date().getTime();
    await $fetch('/api/mongo/resumenes/totaldiario', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        onRequestError({ request, options, error }) {
            return -1;
        },
    });
    let end = new Date().getTime();
    return end - start;
}

async function resumenesToptenMongo(): Promise<number> {
    let start = new Date().getTime();
    await $fetch('/api/mongo/resumenes/topten', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        onRequestError({ request, options, error }) {
            return -1;
        },
    });
    let end = new Date().getTime();
    return end - start;
}

export {
    resumenesContarOrdenesMongo,
    resumenesProductosMongo,
    resumenesProductosFechaMongo,
    resumenesTotalDiarioMongo,
    resumenesToptenMongo
};
