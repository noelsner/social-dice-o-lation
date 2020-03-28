import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AdjustQuantity from './cart/AdjustQuantity';
const Cart = ({ lineItems, cart, createOrder, removeFromCart, products, updateLineItems })=> {

  let subTotal = 0;
  let shipping = 0;

  const status = (product) => {
    if(!product.quantity){
      return (
        <span className='text-danger'>Out of Stock</span>
      )
    } else if(product.quantity <= 3){
      return (
        <span className='text-warning'>Low Inventory. {product.quantity} Items Left</span>
      )
    } else if(product.quantity > 3){
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
                <th className='text-center'>Price</th>
                <th className='text-center'>Total</th>
                <th className='text-center'>Remove</th>
              </tr>
            </thead>
            <tbody>
              {
                lineItems.filter( lineItem => lineItem.orderId === cart.id ).map( lineItem => {
                  const product = products.find( product => product.id === lineItem.productId)
                  subTotal += ((product.price)*(lineItem.quantity));
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
            </tbody>
          </table>
          <div className='mx-auto mt-4 w-50'>
            <div className='d-flex justify-content-center'>
              <div className='d-flex flex-column align-items-end'>
                <h6 className='mr-4 '>Subtotal</h6>
                <h6 className='mr-4 '>Shipping</h6>
                <h4 className='mr-4 '>Total</h4>
              </div>
              <div className='d-flex flex-column align-items-end'>
                <h6>${Number(subTotal).toFixed(2)}</h6>
                <h6>${Number(shipping).toFixed(2)}</h6>
                <h4 className='font-weight-bolder'>${Number(subTotal + shipping).toFixed(2)}</h4>
              </div>
            </div>
            <div className='d-flex flex-column mt-4'>
              <a href='#view=checkout' className='d-flex justify-content-center'><button id='checkout-btn' type='button' className='btn btn-primary w-100' disabled={ !lineItems.find( lineItem => lineItem.orderId === cart.id )}>Checkout</button></a>              
              <a className='text-secondary text-center mt-2' href='#view=products'>Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
