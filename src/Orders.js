import React from 'react';


const Orders = ({ lineItems, orders, products })=> {
  console.log(orders)
  
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-md-offset-2'>
          {
            orders.map( order => {
              const _lineItems = lineItems.filter( lineItem => lineItem.orderId === order.id);
              return (
                <table key={ order.id } className='table table-hover'>
                  <thead className='bg-light'>
                    <tr>
                      <th className='d-flex justify-content-between'>
                        <h5>
                          OrderID: { order.id.slice(0, 4) }
                        </h5>
                        <h5>
                          Order Date: 03/27/2020 
                        </h5>
                        <h5>
                          Order Total: $xx.xx
                        </h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      _lineItems.map( lineItem => {
                        const product = products.find( product => product.id === lineItem.productId);
                        return (
                          <tr key={ lineItem.id} className=''>
                            <td className='col-sm-12 col-md-12'>
                              <div className='media order-product'>
                                <a href={`#view=product&id=${product.id}`} className='thumbnail pull-left'><img className='cart-product-img media-object' src={product.imageURL} /></a>
                                <div className='ml-2'>
                                  <h6><a href={`#view=product&id=${product.id}`}>{product.name}</a></h6>
                                  <div>
                                    <span>${Number(product.price).toFixed(2)} </span>
                                    Qty: {lineItem.quantity}
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
