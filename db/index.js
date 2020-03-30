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
  updateLineItem,
  getCompletedOrders
} = require('./userMethods');

const sync = async()=> {
  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS "lineItems";
    DROP TABLE IF EXISTS "completedOrders";
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "firstName" VARCHAR(100),
      "lastName" VARCHAR(100),
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
      description VARCHAR(1000) DEFAULT 'No description available.'
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
    CREATE TABLE "completedOrders" (
      "completedOrderId" UUID PRIMARY KEY DEFAULT uuid_generate_v4() , 
      "orderId" UUID NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "productId" UUID NOT NULL,
      "orderPrice" DECIMAL NOT NULL,
      quantity INTEGER DEFAULT 1
    );
    
    INSERT INTO "completedOrders"( 
      "orderId", 
      "productId", 
      "orderPrice", 
      quantity)
    VALUES(
      '59839a09-ac5b-4619-be96-b2ab58d8b0c0',
      'daa63415-c251-488c-bf0a-1f2ff462fc07',
      '9.99',
      7
      );

  `;
  await client.query(SQL);

  const _users = {
    lucy: {
      firstName: 'Lucy',
      lastName: 'Doe',
      username: 'lucy',
      password: 'LUCY',
      role: 'ADMIN'
    },
    moe: {
      firstName: 'Moe',
      lastName: 'Smith',
      username: 'moe',
      password: 'MOE',
      role: null
    },
    curly: {
      firstName: 'Larry',
      lastName: 'Johnson',
      username: 'larry',
      password: 'LARRY',
      role: null
    },
  };

  const _products = {
    codenames: {
      name: 'Codenames',
      price: 15.27,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/I/61opBp2cmLL._SX466_.jpg',
      description: 'Codenames is a social word game with a simple premise and challenging game play. Two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their codenames. The teams compete to see who can make contact with all of their agents first. Spymasters give one-word clues that can point to multiple words on the table. Their teammates try to guess words of their color while avoiding those that belong to the opposing team. And everyone wants to avoid the assassin. The game works very well with 4 players if you prefer to guess without help. Or you can add more players if you prefer lively discussion. There is also a cooperative variant where a single team tries to achieve the highest score they can by playing against the game itself.'
    },
    yahtzee: {
      name: 'Yahtzee',
      price: 7.99,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZ-uTDlEUC8i15MIf3l_OXozcSOX3DjX1oz5Gg_CDlr9LnObXr',
      description: "Take turns rolling dice to try to score combos. You get a total of 13 turns and may roll up to three times on a turn. At the end of each turn, you must fill in one empty box in your column on the score card. The player with the highest grand total at the end of all 13 rounds wins. It's up to the player whether they hustle for a full house or risk it all for a Yahtzee roll. Show it off, and let the dice fall where they may. Game includes 5 dice and shaker that doubles as storage for easy clean up and travel. Yahtzee is a trademark of Hasbro."
    },
    lcr: {
      name: 'LCR Left Right Center',
      price: 6.99,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51Z6zPuHmfL.jpg',
      description: "LCR Left Center Right is a fun, fast-paced dice game that you won't be able to put down! Each game includes 3 specialty marked LCR dice, 24 playing chips and instructions. Players roll the dice to determine where they pass their chips. The last player with chips is the winner and wins the center pot."
    },
    farkle: {
      name: 'Farkle',
      price: 7.99,
      imageURL: 'https://i5.walmartimages.com/asr/9c718ca6-8ff6-4540-9751-32e643d272cb_1.50a8d4f657530b687f1855f3ef2ae182.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
      description: "It's a classic dice game that's perfect for family fun or any game night. Roll the dice and try to collect combinations that will earn you some points. But, if you decide to take a risk and continue rolling, you could lose your points in a Farkle!"
    },
    catan: {
      name: 'Catan The Board Game',
      price: 44.99,
      imageURL: "https://target.scene7.com/is/image/Target/GUEST_f7dfce8b-234e-4343-9f30-5d5c0da5230c?wid=488&hei=488&fmt=pjpeg",
      description: "Players look to collect resources before their opponents do. Use the resources you collect to expand into other new settlements by building roads. Players & opponents should look to trade & barter when it comes to Catan. Be sure to pick the perfect strategy that suits you best to ultimately have your small island town grow into a flourishing city. Roll the dice, trade, build and you may be the first player to reach 10 victory points and thus win the game!"
    },
    carcassonne: {
      name: 'Carcassonne',
      price: 33.99,
      imageURL: "https://cdn.shopify.com/s/files/1/0605/1065/products/s4856_a914d10e-fc2f-46ec-a088-6a0a417988e6.jpg?v=1496770202",
      description: "Carcassonne is a tile-laying game in which players fill in the countryside around the fortified city. Players choose from tiles that depict cities, roads, monasteries, and fields; each new tile placed creates an ever-expanding board on which players can then add their followers. Players score points by having followers on features as they're completed. The player who makes the most strategic placements of tiles and followers will score the most points and win the game."
    },
    gameOfLife: {
      name: 'The Game of Life',
      price: 19.99,
      imageURL: 'https://m.media-amazon.com/images/S/aplus-media/sota/527f03fa-1986-4045-b464-e90503b3804b._SR285,285_.JPG',
      description: "In The Game of Life game players can make their own exciting choices as they move through the twists and turns of life. Move the car token around the gameboard from Start to Retirement, and experience unexpected surprises related to family, career, dream vacations, and other milestones of life. Once everyone reaches the end of the game at retirement, everyone pays their debts and adds up their wealth. The player with the most money at the end of the game wins! The Game of Life is a trademark of Hasbro."
    },
    monopoly: {
      name: 'Monopoly',
      price: 24.99,
      imageURL: 'https://www.gamesworld.com.au/wp-content/uploads/2017/08/monopoly-17-1.jpg',
      description:"It's the fast-dealing property trading game where players buy, sell, dream and scheme their way to riches. This version of the Monopoly game welcomes the Rubber Ducky, Tyrannosaurus Rex, and Penguin into its family of tokens. Choose your token, place it on GO! and roll the dice to own it all! There can be only one winner in the Monopoly game. Will it be you? Monopoly is a trademark of Hasbro."
    },
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
  updateLineItem,
  getCompletedOrders
};
