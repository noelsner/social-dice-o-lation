import React from 'react';

const Payment = ({auth}) => {

  return (
    <div className='mt-4'>
      <form className='w-100'>
        <div>
          <div className="form-group">
            <label htmlFor="cardholderName">Name on Card</label>
            <input type="text" className="form-control" id="cardholderName"></input>
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" className="form-control" id="cardNumber"></input>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="CVC">CVC</label>
              <input type="text" className="form-control" id="CVC"></input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="expirationDate">MM/YYYY</label>
              <input type="text" className="form-control" id="expirationDate" placeholder='MM/YYYY'></input>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;