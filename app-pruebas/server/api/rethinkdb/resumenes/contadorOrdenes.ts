import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

export default defineEventHandler(async () => {
  try {
    const conn = await connect();
    // @ts-ignore
    const result = await rethink.table('ordenes').group(rethink.row('fecha')).count().ungroup().orderBy(rethink.desc('group')).run(conn);
    const data = await result.toArray();

      return{
        success: true,
        data
      }
    
    
  } catch (error) {
    return { success: false, error: error };
  }
});

