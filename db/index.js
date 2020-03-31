const client = require('./client');

const { authenticate, compare, findUserFromToken, hash } = require('./auth');

const models = { products, users, orders, lineItems, addresses, completedOrders } = require('./models');

const {
  getCart,
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
    DROP TABLE IF EXISTS addresses;
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

    CREATE TABLE addresses (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
      "userId" UUID REFERENCES users(id) NOT NULL,
      address1 VARCHAR(200),
      address2 VARCHAR(200),
      city VARCHAR(100),
      state VARCHAR(50),
      country VARCHAR(50),
      "zipCode" VARCHAR(50)
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
    pandemic: {
      name: 'Pandemic',
      price: 49.99,
      imageURL: 'https://mk0brilliantmaptxoqs.kinstacdn.com/wp-content/uploads/Pandemic-board-game-600x600.jpg?p=3053',
      description: 'Pandemic is based on the premise that four diseases have broken out in the world, each threatening to wipe out a region. The game accommodates two to four players, each playing one of seven possible specialists: dispatcher, medic, scientist, researcher, operations expert, contingency planner, or quarantine specialist. Through the combined effort of all the players, the goal is to discover all four cures before any of several game-losing conditions are reached.'
    },
    yahtzee: {
      name: 'Yahtzee',
      price: 7.99,
      imageURL: 'https://i5.walmartimages.com/asr/56d38936-8c96-4a7f-9725-4439f2abc5a3_1.b584f3c52295ea0456b63ab3b5d9de22.jpeg',
      description: "Take turns rolling dice to try to score combos. You get a total of 13 turns and may roll up to three times on a turn. At the end of each turn, you must fill in one empty box in your column on the score card. The player with the highest grand total at the end of all 13 rounds wins. It's up to the player whether they hustle for a full house or risk it all for a Yahtzee roll. Show it off, and let the dice fall where they may. Game includes 5 dice and shaker that doubles as storage for easy clean up and travel. Yahtzee is a trademark of Hasbro."
    },
    lcr: {
      name: 'LCR Left Right Center',
      price: 6.99,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51Z6zPuHmfL.jpg',
      description: "LCR Left Center Right is a fun, fast-paced dice game that you won't be able to put down! Each game includes 3 specialty marked LCR dice, 24 playing chips and instructions. Players roll the dice to determine where they pass their chips. The last player with chips is the winner and wins the center pot."
    },
    plague: {
      name: 'Plague Inc.',
      price: 39.99,
      imageURL: 'https://d8mkdcmng3.imgix.net/a930/board-games-party-and-family-plague-inc-the-board.jpg?auto=format&bg=0FFF&fit=fill&h=600&q=100&w=600&s=71977063e4433a1aedbc11d01af2a0c4',
      description: "A strategic game of infection, evolution and extinction for 1-4 players lasting 60-90 minutes. Each person takes on the role of a deadly disease competing against their friends in a battle to be the first to infect and wipe out the world!"
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
    shutTheBox: {
      name: 'Shut the Box',
      price: 17.99,
      imageURL: 'https://i5.walmartimages.com/asr/54e83ea5-6e89-4ae9-93ae-70a8338bdab1_1.d10fedd33dcdf9081eb2e74f725bc4c9.jpeg',
      description:'A traditional English Pub game of dice and numbers. Roll the dice and lay down the matching numbered tiles. Players can challenge each other for lowest score. Lay down all the tiles and you have "Shut the Box!"'
    },
    taboo: {
      name: 'Taboo',
      price: 19.99,
      imageURL: 'https://5.imimg.com/data5/DZ/OE/UE/SELLER-40336933/taboo-500x500.jpg',
      description:"Players try to get teammates to say the Guess word on the card without using any of the Taboo words in the clues. If the describer says a Taboo word listed on the card while giving the clues, they'll get interrupted with the electronic buzzer and lose a turn. Players keep the cards that were guessed correctly, and the team with the most cards wins the game."
    },
  };

  const [lucy, moe] = await Promise.all(Object.values(_users).map( user => users.create(user)));
  const [codenames, yahtzee, lcr, farkle, catan, carcassonne, gameOfLife, monopoly  ] = await Promise.all(Object.values(_products).map( product => products.create(product)));
  
  
  await addresses.create({ 
    userId: moe.id,
    address1: "1683 Walnut Grove Ave",
    city: "Rosemead",
    state: "CA",
    country: "United States",
    zipCode: "91770"
  });

  await addresses.create({ 
    userId: moe.id,
    address1: "1 Infinite Loop",
    city: "Cupertino",
    state: "CA",
    country: "United States",
    zipCode: "95014"
  });
  
  await addresses.create({ 
    userId: lucy.id,
    address1: "1600 Amphitheatre Parkway",
    city: "Mountain View",
    state: "CA",
    country: "United States",
    zipCode: "94043"
  });

  await addresses.create({ 
    userId: lucy.id,
    address1: "1601 Willow Rd",
    city: "Menlo Park",
    state: "CA",
    country: "United States",
    zipCode: "94025"
  });

  const _orders = {
    moe: {
      userId: moe.id
    },
    lucy: {
      userId: lucy.id
    }
  };

  //const moeOrder1 = await orders.create(moe.id);
  //const moeOrder2 = await orders.create(moe.id);
  //const lucyOrder1 = await orders.create(lucy.id);
  //const lucyOrder2 = await orders.create(lucy.id);


  //await completedOrders(orderId, productId, orderPrice, quantity);

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
  addToCart,
  removeFromCart,
  createOrder,
  getLineItems,
  updateLineItem,
  getCompletedOrders
};
