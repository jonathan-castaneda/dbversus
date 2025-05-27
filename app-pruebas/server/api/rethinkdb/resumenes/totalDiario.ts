import { connect, rethink } from '~/server/utils/rethinkdb/rethinkdb';

export default defineEventHandler(async () => {
  try {
    const conn = await connect();
    //@ts-ignore
    const result = await rethink.db('cafeteria').table('ordenes').group(rethink.row('fecha')).sum('total').ungroup().orderBy(rethink.asc('group')).run(conn);

    const data = await result.toArray();

    return {
      success: true,
      data: data
    };
    
  } catch (error) {
    return { success: false, error:error };
  }
});

