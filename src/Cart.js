import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AdjustQuantity from './cart/AdjustQuantity';
const Cart = ({ lineItems, cart, createOrder, removeFromCart, products, updateLineItems })=> {

  const status = (product) => {
    if(!product.qty){
      return (
        <span className='text-danger'>Out of Stock</span>
      )
    } else if(product.qty <= 3){
      return (
        <span className='text-warning'>Low Inventory. {product.qty} Items Left</span>
      )
    } else if(product.qty > 3){
      return (
        <span className='text-success'>In Stock</span>
      )
    };
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-md-offset-2'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {
                lineItems.filter( lineItem => lineItem.orderId === cart.id ).map( lineItem => {
                  const product = products.find( product => product.id === lineItem.productId)
                  return (
                    <tr key={ lineItem.id }>
                      <td className='col-sm-8 col-md-6'>
                        <div className='media'>
                          <a href={`#view=product&id=${product.id}`} className='thumbnail pull-left'><img className='cart-product-img media-object' src={product.imageURL} /></a>
                          <div className='ml-2'>
                            <h4><a href={`#view=product&id=${product.id}`}>{product.name}</a></h4>
                            <div>
                              <span>Status: </span>
                              {status(product)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='col-sm-1 col-md-1 text-center'> <AdjustQuantity lineItemQuantity = {lineItem.quantity} lineItemId = {lineItem.id} updateLineItems = {updateLineItems}/></td>
                      <td className='col-sm-1 col-md-1 text-center'>${Number(product.price).toFixed(2)}</td>
                      <td className='col-sm-1 col-md-1 text-center'>${Number((product.price)*(lineItem.quantity)).toFixed(2)}</td>
                      <td className='d-flex justify-content-center'>
                        <button className='btn btn-link-danger py-0' onClick={ ()=> removeFromCart(lineItem.id)}><FontAwesomeIcon icon={faTrash} /></button>
                      </td>
                    </tr>
                  );
                })
              }
              <tr>
                  <td>   </td>
                  <td>   </td>
                  <td>   </td>
                  <td>Subtotal</td>
                  <td className="text-right"><h5><strong>$xx.xx</strong></h5></td>
              </tr>
              <tr>
                  <td>   </td>
                  <td>   </td>
                  <td>   </td>
                  <td>Shipping</td>
                  <td className="text-right"><h5><strong>$0.00</strong></h5></td>
              </tr>
              <tr>
                  <td>   </td>
                  <td>   </td>
                  <td>   </td>
                  <td><h5>Total</h5></td>
                  <td className="text-right"><h5><strong>$xx.xx</strong></h5></td>
              </tr>
              <tr>
                  <td>   </td>
                  <td>   </td>
                  <td>   </td>
                  <td>
                    <button type="button" className="btn btn-outline-secondary" href='view=products'>Continue Shopping</button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-success" disabled={ !lineItems.find( lineItem => lineItem.orderId === cart.id )} onClick={ createOrder }>Checkout</button>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <h2>Cart - { cart.id && cart.id.slice(0, 4) }</h2> */}
      
    </div>
  );
};

export default Cart;
