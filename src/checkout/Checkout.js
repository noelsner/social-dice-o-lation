import React, {useEffect} from 'react';
import Shipping from './Shipping';
import Payment from './Payment';
import OrderSummary from './OrderSummary';

const Checkout = ({ auth, lineItems, cart, createOrder, removeFromCart, products, updateLineItems }) => {
  return (
    <div className='d-flex align-items-top'>
      <div className='d-flex flex-column align-items-center w-75'>
        <div className='bg-light m-4 px-4 pt-4 w-100'>
          <h4>Shipping Details</h4>
          <Shipping auth={auth}/>
        </div>
        <div className='bg-light m-4 p-4 w-100'>
          <h4>Payment Method</h4>
          <Payment auth={auth}/>
        </div>
        <div className='bg-light m-4 p-4 w-100'>
          <h4>Order Summary</h4>
          <OrderSummary lineItems={lineItems} removeFromCart={removeFromCart} cart={cart} createOrder={createOrder} products={products} updateLineItems = {updateLineItems} />
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <div className='bg-light m-4 p-4'>
          <h4>Confirm Order</h4>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

{/* <input ref={el => input = el}></input> */}