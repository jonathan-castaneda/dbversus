//eliminamos una categoria por su id
import{productos} from "../../utils/mysql";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        if (!body.id) {
            return { statusCode:400, "message":"Faltan campos requeridos" };
        }
        const data = await productos.destroy({
                        where: {
                            id: body.id
                        }
                    });
        return { statusCode:200, "message":"eliminado" };
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        return(error)
      }    
  })
