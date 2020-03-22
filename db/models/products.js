const client = require('../client');

const products = {
  read: async()=> {
    return (await client.query('SELECT * from products')).rows;
  },
  create: async({ name, price, description })=> {
    const SQL = `INSERT INTO products(name, price, description) values($1, $2, $3) returning *`;
    return (await client.query(SQL, [name, price, description ])).rows[0];
  },
};

module.exports = products;
