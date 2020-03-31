const client = require('../client');

const orders = {
  read: async()=> {
    return (await client.query('SELECT * from orders')).rows;
  },
  create: async({ userId })=> {
    const SQL = `INSERT INTO orders("userId") values($1) returning *`;
    return (await client.query(SQL, [userId])).rows[0];
  },
  update: async({ id, addressId })=> {
    const SQL = `UPDATE orders SET "addressId" = $1 WHERE id = $2 returning *`;
    return (await client.query(SQL, [addressId, id])).rows[0];
  }
};

module.exports = orders;
