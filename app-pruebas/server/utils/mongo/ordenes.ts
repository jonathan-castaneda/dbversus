import pruebas from '../pruebas.json'

async function ordenesInsertarMongo(total: number, totaldetalle: number,contaInicial:number): Promise<number> {
  console.log("Iniciando inserción de órdenes en MongoDB")
  let start = new Date().getTime();

  for (let conta = contaInicial; conta <=Number(total) + Number(contaInicial); conta++) {
    let anio = new Date().getFullYear();
    let mes = Math.floor(Math.random() * 12) + 1;
    let dia = Math.floor(Math.random() * 28 + 1);
    let lfecha = new Date(anio, mes - 1, dia); // Mongo espera objeto Date, no string

    // Generar los detalles como subdocumentos
    let detalleOrden = [];
    for (let j = 1; j <= totaldetalle; j++) {
      detalleOrden.push({
        cantidad: Math.floor(Math.random() * 10) + 1,
        nombre: `Producto ${j}`,
        precio: Math.floor(Math.random() * 100) + 1,
        categoria: {
          nombre: Math.random() > 0.5 ? "Platos" : "Bebidas"
        },
        subtotal: 0 // se calcula abajo
      });
      detalleOrden[j - 1].subtotal = detalleOrden[j - 1].cantidad * detalleOrden[j - 1].precio;
    }

    // Sumar total
    const totalOrden = detalleOrden.reduce((acc, item) => acc + item.subtotal, 0);

    const ldata = {
      _id: conta,
      fecha: lfecha,
      mesero: "AutoInsert",
      mesa: `${Math.floor(Math.random() * 10) + 1}`,
      cliente: `Cliente ${conta}`,
      estado: "C",
      observacion: "Generada automáticamente",
      total: totalOrden,
      detalleOrden
    };

    await $fetch('/api/mongo/orden', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ldata),
      onRequestError({ request, options, error }) {
        console.error("Error insertando orden Mongo:", error);
        return -1;
      }
    });
  }

  let end = new Date().getTime();
  return end - start;
}

async function ordenesConsultarAzarMongo(total: number,contaInicial:number): Promise<number> {
  let start = new Date().getTime();
  for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
    let id = Math.floor(Math.random() * pruebas.ordenes.insertar) + 1;
    await $fetch(`/api/mongo/ordenes/` + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      onRequestError({ request, options, error }) {
        console.error("Error consultando orden Mongo:", error);
        return -1;
      },
    });
  }
  let end = new Date().getTime();
  return end - start;
}

async function ordenesActualizarMongo(total: number,contaInicial:number): Promise<number> {
  let start = new Date().getTime();

  for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
    // Simular detalles nuevos
    let nuevosDetalles = [];
    for (let j = 1; j <= 5; j++) {
      let cantidad = Math.floor(Math.random() * 10 + 1) * 2; // Duplicamos
      let precio = Math.floor(Math.random() * 100 + 1);
      nuevosDetalles.push({
        cantidad,
        nombre: `Producto ${j} actualizado`,
        precio,
        categoria: {
          nombre: Math.random() > 0.5 ? "Platos" : "Bebidas",
        },
        subtotal: cantidad * precio,
      });
    }

    const totalOrden = nuevosDetalles.reduce((acc, item) => acc + item.subtotal, 0);

    const ldata = {
      _id: i,
      fecha: new Date(),
      mesero: "Mesero Actualizado",
      mesa: `${Math.floor(Math.random() * 10) + 1}`,
      cliente: `Cliente ${i} Actualizado`,
      estado: "A", // Actualizado
      observacion: "Actualizada automáticamente",
      total: totalOrden,
      detalleOrden: nuevosDetalles,
    };

    await $fetch(`/api/mongo/ordenes/${i}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ldata),
      onRequestError({ request, options, error }) {
        console.error("Error actualizando orden:", error);
        return -1;
      },
    });

    console.log(ldata.cliente); // Confirmación por consola
  }

  let end = new Date().getTime();
  return end - start;
}


async function ordenesEliminarMongo(total: number,contaInicial:number): Promise<number> {
  let start = new Date().getTime();

  for (let i = contaInicial; i <=Number(total) + Number(contaInicial); i++) {
    await $fetch(`/api/mongo/ordenes/${i}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: i }),
      onRequestError({ request, options, error }) {
        console.error("Error eliminando orden Mongo:", error);
        return -1;
      },
    });
  }

  let end = new Date().getTime();
  return end - start;
}

export {
  ordenesInsertarMongo,
  ordenesConsultarAzarMongo,
  ordenesActualizarMongo,
  ordenesEliminarMongo
}