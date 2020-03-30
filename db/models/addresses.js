const client = require('../client');

const addresses = {
  read: async()=> {
    return (await client.query('SELECT * FROM addresses')).rows;
  },
  readOneUser: async(userId)=> {
    return (await client.query('SELECT * FROM addresses WHERE "userId" = $1',[userId])).rows;
  },
  create: async({ userId, address1, address2, city, state, country, zipCode})=> {
    const SQL = `INSERT INTO addresses("userId", address1, address2, city, state, country, "zipCode") values($1, $2, $3, $4, $5, $6, $7) returning *`;
    return (await client.query(SQL, [userId, address1, address2, city, state, country, zipCode])).rows[0];
  },
};

module.exports = addresses;