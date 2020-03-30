const client = require('../client');

const completedOrders = {
  read: async()=> {
    return (await client.query('SELECT * FROM "completedOrders"')).rows;
  },
  create: async(orderId, productId, orderPrice, quantity) => {
    const SQL = 'INSERT INTO "completedOrders"("orderId", "productId", "orderPrice", quantity) VALUES($1, $2, $3, $4);'
    return (await client.query(SQL, [orderId, productId, orderPrice, quantity])).rows[0];
  },
};

module.exports = completedOrders;