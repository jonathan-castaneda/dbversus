//hace el trabajo de actualizar una categoria
//primero recibe la categoria del body y valida que traiga todos los campos segun el modelo
//luego hace la actualizacion en la base de datos
import {categorias} from "../../../models/mysql";
export default defineEventHandler(async (event) => {
    // imprimimos en consola la data que recibimos
    const body = await readBody(event);
    //console.log(body)
    
    try {
        //ahora guardo en la base de datos
        
        const data = await categorias.update({
                        nombre: body.nombre,
                        },
                        {where: {id: body.id}}
                        );
        return { statusCode:200, "message":"actualizado" };
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        return(error)
      }

    
  })


