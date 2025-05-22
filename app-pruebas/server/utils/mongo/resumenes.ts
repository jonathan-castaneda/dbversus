// Consultas de resumenes o totales desde la API de MongoDB

async function resumenesContarOrdenes(): Promise<number> {
    let start = new Date().getTime();
    await $fetch('http://localhost:3000/api/mongo/resumenes/countordenes', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        onRequestError({ request, options, error }) {
            return -1;
        },
    });
    let end = new Date().getTime();
    return end - start;
}

async function resumenesProductos(): Promise<number> {
    let start = new Date().getTime();
    await $fetch('http://localhost:3000/api/mongo/resumenes/productosdiarios', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        onRequestError({ request, options, error }) {
            return -1;
        },
    });
    let end = new Date().getTime();
    return end - start;
}

async function resumenesProductosFecha(): Promise<number> {
    let start = new Date().getTime();
    let anio = new Date().getFullYear();        
    let mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    let dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    let fecha = `${anio}-${mes}-${dia}`;

    await $fetch(`http://localhost:3000/api/mongo/resumenes/productosdiariosfecha?fecha=${fecha}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        onRequestError({ request, options, error }) {
            return -1;
        },
    });
    let end = new Date().getTime();
    return end - start;
}

async function resumenesTotalDiario(): Promise<number> {
    let start = new Date().getTime();
    await $fetch('http://localhost:3000/api/mongo/resumenes/totaldiario', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        onRequestError({ request, options, error }) {
            return -1;
        },
    });
    let end = new Date().getTime();
    return end - start;
}

async function resumenesTopten(): Promise<number> {
    let start = new Date().getTime();
    await $fetch('http://localhost:3000/api/mongo/resumenes/topten', {
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
    resumenesContarOrdenes,
    resumenesProductos,
    resumenesProductosFecha,
    resumenesTotalDiario,
    resumenesTopten
};
