import React, { useState } from 'react';

const Shipping = ({auth}) => {
  const [firstName, setFirstName] = useState(auth.username);
  const [lastName, setLastName] = useState('Last Name')
  return (
    <div>
      <div>

      </div>
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
        <div className='form-row'>
          <div className="form-group col-md-12">
            <label htmlFor="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"></input>
          </div>
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
      </form>
    </div>
  );
};

export default Shipping;