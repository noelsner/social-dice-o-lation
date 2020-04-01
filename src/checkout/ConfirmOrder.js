import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ConfirmOrder = ({lineItems, cart, createOrder, products, orders}) => {

  let shipping = 0;
  let subTotal = 0;

  const headers = () => {
    const token = window.localStorage.getItem('token');
    return {
      headers: {
        authorization: token
      }
    };
  };

  const [confirmAddress, setConfirmAddress] = useState('');
  const [addressError, setAddressError] = useState('No Address Specified');
  
  useEffect( ()=> {
    console.log('Confirm checkout');
    console.log(cart);
    if(cart.addressId){
      axios.get(`/api/singleAddress/${cart.addressId}`, headers())
        .then(response => {
          console.log(response.data);
          setConfirmAddress(response.data);
        })
        .catch(ex => console.log(ex));
    }
  },[cart])
  console.log(cart.addressId);

  lineItems.filter( lineItem => lineItem.orderId === cart.id ).map( lineItem => {
    const product = products.find( product => product.id === lineItem.productId)
    subTotal += ((product.price)*(lineItem.quantity));
  });
  const ConfirmedAddress = ()=> {

    axios.put('api/updateOrder', cart, headers())
      .then( (response)=> {
        console.log(response.data)  
      })
      .catch(ex=> { console.log(ex)})
    return(
      <div>
        {confirmAddress.address1}
        {confirmAddress.address2}
        <br/>
        {`${confirmAddress.city}, ${confirmAddress.state} ${confirmAddress.zipCode}`}
      </div>
    );

  };
  return (
    <div>
      <h4> Ship to: </h4>
      {!cart.addressId && <h4>{addressError}</h4>}
      {cart.addressId && <ConfirmedAddress />}
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
        <button id='checkout-btn' type='button' className='btn btn-success w-100 mt-2 text-white' disabled={ !lineItems.find( lineItem => lineItem.orderId === cart.id ) || !cart.addressId} onClick={ createOrder } data-toggle='modal' data-target='#orderConfirmation'>Checkout</button>              
      </div>

      <div className="modal fade" id="orderConfirmation" tabIndex="-1" role="dialog" aria-labelledby="orderConfirmationTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderConfirmationTitle">We've received your order</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className=''>
                {orders && 
                (
                  lineItems.filter( lineItem => lineItem.orderId === orders.id ).map( lineItem => {
                    const product = products.find( product => product.id === lineItem.productId)
                    return (
                      <li key={ lineItem.id }>
                        <div className=''>
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
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
            <div className="modal-footer d-flex justify-content-between align-items-center">
              <div>Your order will now appear in your <a href='#view=orders'>order history</a></div>
              <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;