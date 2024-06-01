import db from "../../../models/mysql";

export default defineEventHandler(async (event) => {
    // imprimimos en consola la data que recibimos
    const body = await readBody(event);
    console.log(body)
    

    try {
        //ahora guardo en la base de datos
        //await db.sequelize.authenticate();
        const data = await db.categorias.create({
                        id: 0,
                        nombre: "borrame",
                        });
        return data;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        return(error)
      }

    //retornamos hola mundo
    return "Hubo un error"
  })