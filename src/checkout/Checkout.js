import React, {useEffect} from 'react';
import Shipping from './Shipping';
import Payment from './Payment';
import OrderSummary from './OrderSummary';
import ConfirmOrder from './ConfirmOrder';

const Checkout = ({ auth, lineItems, cart, createOrder, removeFromCart, products, updateLineItems, orders }) => {
  return (
    <div className='row'>


      <div className='col-sm-12 col-md-7'>
        <div className='bg-light mx-4 mb-4 px-4 pt-4 w-100'>
          <h4>Shipping Details</h4>
          <Shipping auth={auth}/>
        </div>
        <div className='bg-light m-4 p-4 w-100'>
          <h4>Payment Method</h4>
          <Payment auth={auth}/>
        </div>
        <div className='bg-light m-4 p-4 w-100'>
          <div className='d-flex align-items-center'>
            <h4>Order Summary</h4>
            <a href='#view=cart' className='ml-4 text-dark'>Edit Cart</a>
          </div>
          <OrderSummary lineItems={lineItems} removeFromCart={removeFromCart} cart={cart} createOrder={createOrder} products={products} updateLineItems = {updateLineItems} />
        </div>
      </div>

      <div className='col-sm-12 col-md-5'>
        <div className='bg-light mx-4 mb-4 p-4'>
          <h4>Confirm Order</h4>
          <ConfirmOrder lineItems={lineItems} cart={cart} createOrder={createOrder} products={products} orders={orders} />
        </div>
      </div>


    </div>
  );
};

export default Checkout;

{/* <input ref={el => input = el}></input> */}