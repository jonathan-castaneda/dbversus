import pruebas from '../pruebas.json';

async function ordenesInsertarSqlServer(total: number, totaldetalle: number): Promise<number> {
    console.log("Iniciando inserción de órdenes");
    let start = new Date().getTime();
    for (let conta = 1; conta <= total; conta++) {
        let anio = new Date().getFullYear();
        let mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        let dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
        let lfecha: string = `${anio},${mes},${dia}`;

        const ldata = {
            id: conta,
            fecha: lfecha,
            total: Math.floor(Math.random() * 100) + 1,
        };
        // Insertar orden
        await $fetch('http://localhost:3000/api/sqlserver/orden', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldata),
            onRequestError({ request, options, error }) {
                console.error("Error al insertar orden:", error);
            },
        });

        // Insertar detalles de la orden
        await detalleOrdenInsertarSqlServer(conta, totaldetalle);
    }
    let end = new Date().getTime();
    return end - start;
}

async function detalleOrdenInsertarSqlServer(idOrden: number, totaldetalle: number) {
    for (let j = 1; j <= totaldetalle; j++) {
        const ldatadetalle = {
            idorden: idOrden,
            idproducto: j, // Simulación de ID del producto
            cantidad: Math.floor(Math.random() * 10) + 1,
            precio: Math.floor(Math.random() * 100) + 1,
        };
        // Insertar detalle de orden
        await $fetch('http://localhost:3000/api/sqlserver/detalleorden', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldatadetalle),
            onRequestError({ request, options, error }) {
                console.error("Error al insertar detalle de orden:", error);
            },
        });
    }
}

async function ordenesConsultarAzarSqlServer(total: number): Promise<number> {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        let id = Math.floor(Math.random() * pruebas.ordenes.insertar) + 1; // ID aleatorio
        // Consultar orden
        await $fetch(`http://localhost:3000/api/sqlserver/orden/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            onRequestError({ request, options, error }) {
                console.error("Error al consultar orden:", error);
            },
        });
        // Consultar detalles de la orden
        await $fetch(`http://localhost:3000/api/sqlserver/detalleorden/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            onRequestError({ request, options, error }) {
                console.error("Error al consultar detalles:", error);
            },
        });
    }
    let end = new Date().getTime();
    return end - start;
}

async function ordenesActualizarSqlServer(total: number): Promise<number> {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        const ldata = {
            id: i,
            fecha: new Date().toISOString(), // Formato ISO para SQL Server
            total: Math.floor(Math.random() * 100) + 1,
        };
        // Actualizar orden
        await $fetch(`http://localhost:3000/api/sqlserver/orden/${i}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ldata),
            onRequestError({ request, options, error }) {
                console.error("Error al actualizar orden:", error);
            },
        });

        // Actualizar detalles de la orden
        let detalles = await $fetch(`http://localhost:3000/api/sqlserver/detalleorden/${i}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            onRequestError({ request, options, error }) {
                console.error("Error al consultar detalles:", error);
            },
        });

        let ldetalles = detalles.data;
        for (let detalle of ldetalles) {
            const ldatadetalle = {
                idorden: i,
                idproducto: detalle.idproducto,
                cantidad: detalle.cantidad * 2, // Multiplica cantidad por 2
                precio: detalle.precio,
            };
            // Actualizar detalle
            await $fetch(`http://localhost:3000/api/sqlserver/detalleorden/${detalle.idorden}/${detalle.idproducto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ldatadetalle),
                onRequestError({ request, options, error }) {
                    console.error("Error al actualizar detalle:", error);
                },
            });
        }
    }
    let end = new Date().getTime();
    return end - start;
}

async function ordenesEliminarSqlServer(total: number): Promise<number> {
    let start = new Date().getTime();
    for (let i = 1; i <= total; i++) {
        // Eliminar orden
        await $fetch(`http://localhost:3000/api/sqlserver/orden/${i}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: i }),
            onRequestError({ request, options, error }) {
                console.error("Error al eliminar orden:", error);
            },
        });
    }
    let end = new Date().getTime();
    return end - start;
}

export { ordenesInsertarSqlServer, ordenesConsultarAzarSqlServer, ordenesActualizarSqlServer, ordenesEliminarSqlServer };
