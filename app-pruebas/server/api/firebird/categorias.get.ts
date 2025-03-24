//obtenemos todas las categorias de la base de datos
import {categorias} from "../../utils/firebird/firebird";

export default defineEventHandler(async (event) => {      
    try {        
        const data = await categorias.findAll();
        return data;
      } catch (error) {
        console.error('Unableee to connect to the database:', error);
        return(error)
      }
    
  })
