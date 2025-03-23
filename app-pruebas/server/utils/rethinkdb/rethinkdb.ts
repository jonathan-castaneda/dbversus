import rethink from 'rethinkdb';

// quitar el export
async function connect() {
    return await rethink.connect({ host: 'localhost', port: 28015, db: 'cafeteria' });
}

export { connect, rethink };