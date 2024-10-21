import { ordenes } from "../../../utils/mysql";
export default defineEventHandler(async (event) => {      
    try {        
        const data = await ordenes.findOne({
            attributes: [[sequelize.fn('count', sequelize.col('id')), 'count']],
            raw: true
        });
        return { statusCode:200, data };
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        return(error)
        }
    })
