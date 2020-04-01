import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';


const Orders = ({ lineItems, orders, products})=> {

  const [completedOrders, setCompletedOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const headers = () => {
    const token = window.localStorage.getItem('token');
    return {
      headers: {
        authorization: token
      }
    };
  };

  useEffect( ()=> {
    axios.get('/api/getCompletedOrders', headers())
      .then( response => setCompletedOrders(response.data))
      .catch(ex => console.log(ex))
  },[]);

  useEffect( ()=> {
    axios.get('/api/Addresses', headers())
      .then( response => setAddresses(response.data))
      .catch(ex => console.log(ex))
  },[]);

  console.log(orders);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-md-offset-2'>
          {
            orders.filter(order => order.status === 'ORDER').map( order => {
              const address = addresses.find(address => address.id === order.addressId);
              const _completedOrders = completedOrders.filter(completedOrder => completedOrder.orderId === order.id);
              let total = _completedOrders.reduce((acc, comOrder) => {
                acc += (comOrder.orderPrice * comOrder.quantity)
                return acc;
              }, 0);
              return (
                <table key={ order.id } className='table table-hover'>
                  <thead className='bg-light'>
                    <tr>
                      <th className='d-flex justify-content-between'>
                        <h5>
                          <a href = {`#view=orders&order=${order.id}`} >OrderID: { order.id.slice(0, 4) }</a>
                        </h5>
                        <h5>
                          Order Date: {moment(order.createdAt).format('L')} 
                        </h5>
                        <h5>
                          Order Total: ${Number(total).toFixed(2)}
                        </h5>
                      </th>
                    </tr>
                    <tr>
                      <td>
                      {
                      address && `Shipping to: 
                                  ${address.address1} 
                                  ${address.city}, 
                                  ${address.state}
                                  ${address.zipCode}`
                      }
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      _completedOrders.map( compOrder => {
                        const product = products.find( product => product.id === compOrder.productId);
                        return (
                          <tr key={ compOrder.productId} className=''>
                            <td className='col-sm-12 col-md-12'>
                              <div className='media order-product'>
                                <a href={`#view=product&id=${product.id}`} className='thumbnail pull-left'><img className='cart-product-img media-object' src={product.imageURL} /></a>
                                <div className='ml-2'>
                                  <h6><a href={`#view=product&id=${product.id}`}>{product.name}</a></h6>
                                  <div>
                                    <span>${Number(compOrder.orderPrice).toFixed(2)} </span>
                                    Qty: {compOrder.quantity}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Orders;
