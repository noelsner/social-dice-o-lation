const client = require('./client');

const getCart = async(userId)=> {
  const response = await client.query(`SELECT * FROM orders WHERE status='CART' and "userId"=$1`, [userId]); 
  if(response.rows.length){
    return response.rows[0]; 
  }
  return (await client.query('INSERT INTO orders ("userId") values ($1) returning *', [ userId])).rows[0];
};


const checkInventory =  (cartProducts) => {
  return cartProducts.map( async({productId, quantity}) => {      
    return new Promise( async(resolve, reject) => {
      const currentInventory = (await client.query('SELECT quantity FROM products WHERE id = $1', [productId])).rows[0].quantity;
      console.log(`Found ${currentInventory} units of ${productId}`);
      if(quantity > currentInventory) {
      //if(quantity > 4) { // temporarily pretending we only have 4 units available
        reject(new Error( `Not enough units of ${productId}`));
      };
      resolve();
    });      
  });
};

const insertOrderLines = (cartProducts, orderId) => {
  const SQL = `
    INSERT INTO "completedOrders"( 
      "orderId", 
      "productId", 
      "orderPrice", 
      quantity)
    VALUES($1,$2,$3,$4)
  `;
  return cartProducts.map(({productId, quantity, price})=>{
    return client.query(SQL,[orderId, productId, price, quantity]);
  }); 
}

const getCompletedOrders = async() => {
  const SQL = 'SELECT * FROM "completedOrders"';
  return (await client.query(SQL)).rows;
}

const deductInventory = async(cartProducts) => {
  console.log('Deduct Order Quantities from product Inventory');
  const deductions = cartProducts.map(async({productId, quantity}) => { 
    return new Promise( async(resolve, reject) => {
      const currentInventory = (await client.query('SELECT quantity FROM products WHERE id = $1', [productId])).rows[0].quantity;
      const newInventory = currentInventory - quantity;
      console.log(`initiate deducting ${productId}`);
      await client.query('UPDATE products SET quantity = $1 WHERE id = $2 returning *' ,[newInventory, productId]);
      resolve();
      reject(new Error( `Couldn't deduct ${productId}`));
    })
  });
  console.log(deductions);
  return deductions;
};

const createOrder = async(userId)=> {
  const cart = await getCart(userId);
  cart.status = 'ORDER';
  const cartProducts = (await client.query('SELECT "productId", "lineItems".quantity, price FROM "lineItems" JOIN products ON "lineItems"."productId" = products.id WHERE "orderId" = $1',[cart.id])).rows;
  
  await Promise.all(checkInventory(cartProducts))
  .then(()=> console.log('**** Inventory check complete, there is sufficent stock ****'))
  .catch((ex)=> console.log(ex));

  await Promise.all(deductInventory(cartProducts))
  .then(response => {
    console.log('****** Inventory deducted ******');
    console.log(response);
  })
  .catch((ex)=> console.log(ex));

  await Promise.all(insertOrderLines(cartProducts, cart.id))
  .then(()=> console.log('**** Order Items logged ****'))
  .catch((ex)=> console.log(ex));
  
  return (await client.query(`UPDATE orders SET status=$1 WHERE id=$2 returning *`, [ 'ORDER', cart.id ])).rows[0];
};

const addToCart = async({ productId, userId })=> {
  const cart = await getCart(userId);
  const response = await client.query(`SELECT * from "lineItems" WHERE "orderId"=$1 and "productId"=$2`, [ cart.id, productId ]);
  let lineItem;
  if(response.rows.length){
    lineItem = response.rows[0];
    lineItem.quantity++;
    return (await client.query(`UPDATE "lineItems" set quantity=$1 WHERE id = $2 returning *`, [ lineItem.quantity, lineItem.id ])).rows[0];
  }
  else {
    return (await client.query(`INSERT INTO "lineItems"("productId", "orderId") values ($1, $2) returning *`, [ productId, cart.id])).rows[0];
  }
};

const removeFromCart = async({ lineItemId, userId })=> {
  const cart = await getCart(userId);
  await client.query(`DELETE FROM "lineItems" WHERE id=$1 and "orderId" = $2 returning *`, [ lineItemId, cart.id ]);
};

const getLineItems = async(userId)=> {
  const SQL = `
    SELECT "lineItems".* 
    FROM "lineItems"
    JOIN orders
    ON orders.id = "lineItems"."orderId" 
    WHERE orders."userId" = $1
  `;
  return ( await client.query(SQL, [ userId ])).rows;
};

const updateLineItem = async({lineItemId, newQuantity}) => {
  const productId = (await client.query('SELECT "productId" FROM "lineItems" WHERE id = $1', [lineItemId])).rows[0];
  const currentInventory = (await client.query('SELECT quantity FROM products WHERE id = $1', [productId.productId])).rows[0];

  if(currentInventory.quantity < newQuantity){
    throw Error(`Only ${currentInventory.quantity} units available`);
  };
  
  const SQL = 'UPDATE "lineItems" SET quantity = $1 WHERE id = $2 returning *';
  return ( await client.query(SQL,[newQuantity, lineItemId])).rows[0];
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  createOrder,
  getLineItems,
  updateLineItem,
  getCompletedOrders
}
