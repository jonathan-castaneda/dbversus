import { detalleOrden } from "../../../utils/mysql";
export default defineEventHandler(async (event) => {   
    try {
        //actualizamos el detalle orden con el id de la orden y el id del producto
        const body = await readBody(event);
        const data = await detalleOrden.update(body, {
                        where: {
                            idOrden: event.context.params.idorden,
                            idProducto: event.context.params.idproducto
                        }
                    });
        return { statusCode:200, data };        
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        return(error)
      }
    
  })