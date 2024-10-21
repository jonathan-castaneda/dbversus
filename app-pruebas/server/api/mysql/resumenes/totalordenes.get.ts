//devolvemos el total de las ordenes
import { ordenes } from "../../../utils/mysql";
export default defineEventHandler(async (event) => {      
    try {        
        const data = await ordenes.findOne({
            attributes: [[sequelize.fn('sum', sequelize.col('total')), 'total']],
            raw: true
        });
        return { statusCode:200, data };        
      } catch (error) {
        console.error('Error total ordenes:', error);
        return(error)
      }    
  })
