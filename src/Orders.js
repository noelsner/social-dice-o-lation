import React from 'react';
import moment from 'moment';


const Orders = ({ lineItems, orders, products, completedOrders })=> {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-md-offset-2'>
          {
            orders.map( order => {
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
