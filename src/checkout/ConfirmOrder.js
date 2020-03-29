import React from 'react';

const ConfirmOrder = ({lineItems, cart, createOrder, products, orders}) => {
  let shipping = 0;
  let subTotal = 0;

  lineItems.filter( lineItem => lineItem.orderId === cart.id ).map( lineItem => {
    const product = products.find( product => product.id === lineItem.productId)
    subTotal += ((product.price)*(lineItem.quantity));
  });

  return (
    <div>
      <div className='mx-auto mt-4'>
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
        <button id='checkout-btn' type='button' className='btn btn-success w-100 mt-2' disabled={ !lineItems.find( lineItem => lineItem.orderId === cart.id )} onClick={ createOrder } data-toggle='modal' data-target='#orderConfirmation'>Checkout</button>              
      </div>

      <div className="modal fade" id="orderConfirmation" tabIndex="-1" role="dialog" aria-labelledby="orderConfirmationTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderConfirmationTitle">We've received your order</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div>Order No. {cart.id}</div>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <a href='#view=orders'><button type="button" className="btn btn-primary" >Go to order history</button></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;