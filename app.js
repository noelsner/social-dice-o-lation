const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const models = db.models;

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json());

const isLoggedIn = (req, res, next)=> {
  if(!req.user){
    const error = Error('not authorized');
    error.status = 401;
    return next(error);
  }
  next();
};

const isAdmin = (req, res, next)=> {
  if(req.user.role !== 'ADMIN'){
    return next(Error('not authorized'));
  }
  next();
};

app.use((req, res, next)=> {
  const token = req.headers.authorization;
  if(!token){
    return next();
  }
  db.findUserFromToken(token)
    .then( auth => {
      req.user = auth;
      next();
    })
    .catch(ex => {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    });
});

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


app.post('/api/auth', (req, res, next)=> {
  db.authenticate(req.body)
    .then( token => res.send({ token }))
    .catch( ()=> {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    } );
});

app.get('/api/auth', isLoggedIn, (req, res, next)=> {
  res.send(req.user);
});

app.get('/api/getCart', (req, res, next)=> {
  db.getCart(req.user.id)
    .then( cart => res.send(cart))
    .catch( next );
});

app.get('/api/getOrders', (req, res, next)=> {
  db.getOrders(req.user.id)
    .then( orders => res.send(orders))
    .catch( next );
});

app.post('/api/createOrder', (req, res, next)=> {
  console.log('********** DB.createOrder intiated **********');
  db.createOrder(req.user.id)
    .then( order => res.send(order))
    .catch( next );
});

app.get('/api/getLineItems', (req, res, next)=> {
  db.getLineItems(req.user.id)
    .then( lineItems => res.send(lineItems))
    .catch( next );
});

app.get('/api/getCompletedOrders/:id', (req, res, next)=> {
  db.getCompletedOrders(req.params.id)
    .then( completedOrders => res.send(completedOrders))
    .catch( next );
});

app.put('/api/getLineItems', (req, res, next)=> {
  db.updateLineItem(req.body)
    .then( lineItem => res.send(lineItem))
    .catch(next);
});

app.post('/api/addToCart', (req, res, next)=> {
  db.addToCart({ userId: req.user.id, productId: req.body.productId })
    .then( lineItem => res.send(lineItem))
    .catch( next );
});

app.delete('/api/removeFromCart/:id', (req, res, next)=> {
  db.removeFromCart({ userId: req.user.id, lineItemId: req.params.id })
    .then( () => res.sendStatus(204))
    .catch( next );
});

app.get('/api/products', (req, res, next)=> {
  db.models.products.read()
    .then( products => res.send(products))
    .catch( next );
});

Object.keys(models).forEach( key => {
  app.get(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next)=> {
    models[key].read({ user: req.user })
      .then( items => res.send(items))
      .catch(next);
  });
  app.post(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next)=> {
    models[key].create({ user: req.body })
      .then( items => res.send(items))
      .catch(next);
  });
});

app.use((req, res, next)=> {
  const error = { message: `page not found ${ req.url } for ${ req.method }`, status: 404 };
  next(error);
});

app.use((err, req, res, next)=> {
  console.log(err.status);
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = app;
