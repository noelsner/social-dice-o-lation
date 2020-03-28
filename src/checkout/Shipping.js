import React, { useState } from 'react';

const Shipping = ({auth}) => {
  const [firstName, setFirstName] = useState(auth.username);
  const [lastName, setLastName] = useState('Last Name')
  return (
    <div className='mt-4'>
      <form className='w-100'>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFirstName">First Name</label>
            <input type="text" className="form-control" id="inputFirstName" value={firstName} onChange={ev => setFirstName(ev)}></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLastName">Last Name</label>
            <input type="text" className="form-control" id="inputLastName" placeholder={lastName} onChange={ev => setLastName(ev)}></input>
          </div>
        </div>

        <div>
          <div className='form-group'>
            {/* <label htmlFor="autocomplete">Address</label> */}
            <input type="text" className="form-control mb-2" id="autocomplete" placeholder="Start typing the first line of your address"></input>
            <button className='btn btn-link ml-2' type='button' data-toggle='collapse' data-target='#manualAddress' aria-expanded='false' aria-controls='manualAddress'>Enter Address Manually</button>
          </div>
        </div>

        <div className='collapse' id='manualAddress'>
          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"></input>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Address 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input type="text" className="form-control" id="inputCity"></input>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputState">State</label>
              <input type="text" className="form-control" id="inputState"></input>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputZip">Zip</label>
              <input type="text" className="form-control" id="inputZip"></input>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Shipping;