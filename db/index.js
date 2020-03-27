const client = require('./client');

const { authenticate, compare, findUserFromToken, hash } = require('./auth');

const models = { products, users, orders, lineItems } = require('./models');

const {
  getCart,
  getOrders,
  addToCart,
  removeFromCart,
  createOrder,
  getLineItems,
  updateLineItem
} = require('./userMethods');

const sync = async()=> {
  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS "lineItems";
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(20) DEFAULT 'USER',
      CHECK (char_length(username) > 0)
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL UNIQUE,
      price DECIMAL NOT NULL,
      CHECK (char_length(name) > 0),
      quantity INT NOT NULL DEFAULT 5,
      "imageURL" VARCHAR(300) DEFAULT 'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg',
      description VARCHAR(300) DEFAULT 'No description available.'
    );
    CREATE TABLE orders(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "userId" UUID REFERENCES users(id) NOT NULL,
      status VARCHAR(10) DEFAULT 'CART',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE "lineItems"(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "orderId" UUID REFERENCES orders(id) NOT NULL,
      "productId" UUID REFERENCES products(id) NOT NULL,
      quantity INTEGER DEFAULT 1
    );
  `;
  await client.query(SQL);

  const _users = {
    lucy: {
      username: 'lucy',
      password: 'LUCY',
      role: 'ADMIN'
    },
    moe: {
      username: 'moe',
      password: 'MOE',
      role: null
    },
    curly: {
      username: 'larry',
      password: 'LARRY',
      role: null
    },
  };

  const _products = {
    foo: {
      name: 'foo',
      price: 2,
      imageURL: 'https://www.sprintcenter.com/assets/img/10.12.18-Foo-Fighters-v2-1280x500-8943f0481c.jpg',
      description: 'An term used for unimportant variables in programming when the programmer is too lazy to think of an actual name.'
    },
    bar: {
      name: 'bar',
      price: 2,
      imageURL: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80',
      description: 'A counter across which alcoholic drinks or refreshments are served.'
    },
    bazz: {
      name: 'bazz',
      price: 2.50,
      imageURL: 'https://i.imgur.com/QhPuoW2.jpg',
      description: 'An term used for unimportant variables in programming when the programmer is too lazy to think of an actual name.'
    },
    quq: {
      name: 'quq',
      price: 11.99,
      imageURL: 'https://upload.wikimedia.org/wikipedia/en/4/44/Spike_Milligan%27s_Q_Logo.png',
      description: 'An term used for unimportant variables in programming when the programmer is too lazy to think of an actual name.'
    }
  };
  const [lucy, moe] = await Promise.all(Object.values(_users).map( user => users.create(user)));
  const [foo, bar, bazz] = await Promise.all(Object.values(_products).map( product => products.create(product)));

  const _orders = {
    moe: {
      userId: moe.id
    },
    lucy: {
      userId: lucy.id
    }
  };

  const userMap = (await users.read()).reduce((acc, user)=> {
    acc[user.username] = user;
    return acc;
  }, {});
  const productMap = (await products.read()).reduce((acc, product)=> {
    acc[product.name] = product;
    return acc;
  }, {});
  return {
    users: userMap,
    products: productMap
  };
};

module.exports = {
  sync,
  models,
  authenticate,
  findUserFromToken,
  getCart,
  getOrders,
  addToCart,
  removeFromCart,
  createOrder,
  getLineItems,
  updateLineItem
};
