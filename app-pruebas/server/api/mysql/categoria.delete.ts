//Endpoint para eliminar una categoria de la base de datos
import {categorias} from "../../utils/mysql";

export default defineEventHandler(async (event) => {
    // imprimimos en consola la data que recibimos
    const body = await readBody(event);
    //console.log(body)
    
    try {
        //eliminamos de la base de datos
        const data = await categorias.destroy({
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