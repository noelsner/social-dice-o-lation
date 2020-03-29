import React, { useState, useEffect } from 'react';
import qs from 'qs';
import axios from 'axios';
import Login from './login/Login';
import CreateUser from './login/CreateUser';
import Orders from './Orders';
import Cart from './Cart';
import Products from './Products';
import ProductDetailsPage from './ProductDetailsPage';
import MyNavbar from './Navbar';
import Checkout from './checkout/Checkout';

const headers = () => {
  const token = window.localStorage.getItem('token');
  return {
    headers: {
      authorization: token
    }
  };
};

const App = () => {
  const [params, setParams] = useState(qs.parse(window.location.hash.slice(1)));
  const [auth, setAuth] = useState({});
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then((response) => setProducts(response.data));
  }, []);

  useEffect(
    () => {
      if (auth.id) {
        const token = window.localStorage.getItem('token');
        axios.get('/api/getLineItems', headers()).then((response) => {
          setLineItems(response.data);
        });
      }
    },
    [auth]
  );

  useEffect(
    () => {
      if (auth.id) {
        axios.get('/api/getCart', headers()).then((response) => {
          setCart(response.data);
        });
      }
    },
    [auth]
  );

  useEffect(
    () => {
      if (auth.id) {
        axios.get('/api/getOrders', headers()).then((response) => {
          setOrders(response.data);
        });
      }
    },
    [auth]
  );

  const login = async (credentials) => {
    const token = (await axios.post('/api/auth', credentials)).data.token;
    window.localStorage.setItem('token', token);
    exchangeTokenForAuth();
  };

  const exchangeTokenForAuth = async () => {
    const response = await axios.get('/api/auth', headers());
    setAuth(response.data);
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    window.location.hash = '#';
    setAuth({});
  };

  useEffect(() => {
    exchangeTokenForAuth();
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);

  const createOrder = () => {
    const token = window.localStorage.getItem('token');
    axios
      .post('/api/createOrder', null, headers())
      .then((response) => {
        setOrders([response.data, ...orders]);
        const token = window.localStorage.getItem('token');
        return axios.get('/api/getCart', headers());
      })
      .then((response) => {
        setCart(response.data);
      })
      .then(response => {
        setLineItems([])
      });
  };

  const createUser = async ({firstName, lastName, username, password}) => {
    const token = (await axios.post('/api/auth', {username, password})).data.token;
    window.localStorage.setItem('token', token);
    exchangeTokenForAuth();
    await axios.post('/api/users', {firstName, lastName, username, password});
  };

  const addToCart = (productId) => {
    axios.post('/api/addToCart', { productId }, headers()).then((response) => {
      const lineItem = response.data;
      const found = lineItems.find((_lineItem) => _lineItem.id === lineItem.id);
      if (!found) {
        setLineItems([...lineItems, lineItem]);
      } else {
        const updated = lineItems.map((_lineItem) => (_lineItem.id === lineItem.id ? lineItem : _lineItem));
        setLineItems(updated);      
      }
    });
  };

  const updateLineItems = (updateItem) => {
    const updatedItems = lineItems.map( lineItem => {
      if(lineItem.id === updateItem.id){
        return updateItem;
      }
      return lineItem;
    });
    setLineItems(updatedItems);
  };

  const removeFromCart = (lineItemId) => {
    axios.delete(`/api/removeFromCart/${lineItemId}`, headers()).then(() => {
      setLineItems(lineItems.filter((_lineItem) => _lineItem.id !== lineItemId));
    });
  };

  const { view } = params;

  console.log('auth :', auth);

  if (!auth.id) {
    return (
      <div>
        {
          !view && (
            <Login login={login} />
          )
        }
        {
          view === 'createUser' && (
            <CreateUser createUser={createUser} />
          )
        }
      </div>
    )
  } else {
    return (
      <div>
        <MyNavbar lineItems={ lineItems } logout={logout} auth={auth} cart={cart} />
        <div className='horizontal'>
          {
            !view && (
              <div>
                <Products addToCart={ addToCart } products={ products } lineItems = {lineItems} />
              </div>
            )
          }

          {
            view === 'cart' && (
              <div>
                <Cart lineItems={lineItems} removeFromCart={removeFromCart} cart={cart} createOrder={createOrder} products={products} updateLineItems = {updateLineItems} orders={orders} />
              </div>
            )
          }

          {
            view === 'orders' && (
              <div>
                <Orders lineItems={lineItems} products={products} orders={orders} />
              </div>
            )
          }

          {
            view === 'product' && (
              <div>
                <ProductDetailsPage product={products.find(product => product.id === params.id)} addToCart={addToCart} lineItems = {lineItems} />
              </div>
            )
          }

          {
            view === 'checkout' && (
              <div>
                <Checkout auth={auth} lineItems={lineItems} removeFromCart={removeFromCart} cart={cart} createOrder={createOrder} products={products} updateLineItems = {updateLineItems} />
              </div>
            )
          }

        </div>
      </div>
    );
  }
};

export default App;
