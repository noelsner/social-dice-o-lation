import React from 'react';

const OrderSummary = ({ lineItems, cart, createOrder, removeFromCart, products, updateLineItems }) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-md-offset-2'>
          <table className='table table-hover'>
            {/* <thead>
              <tr>
                <th>Product</th>
              </tr>
            </thead> */}
            <tbody>
              {
                lineItems.filter( lineItem => lineItem.orderId === cart.id ).map( lineItem => {
                  const product = products.find( product => product.id === lineItem.productId)
                  return (
                    <tr key={ lineItem.id }>
                      <td className='col-sm-12 col-md-12'>
                        <div className='media'>
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
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;