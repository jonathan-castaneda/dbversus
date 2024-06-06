import { detalleOrden} from "../../../utils/mysql";
export default defineEventHandler(async (event) => {   
    try {
        //eliminamos de la base de datos
        const data = await detalleOrden.destroy({
                        where: {
                            idOrden: event.context.params.idorden
                        }
                    });
        return { statusCode:200, "message":"eliminado" };
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        return(error)
      }
    
  })