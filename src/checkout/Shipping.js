import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListAddresses from './ListAddresses';

const Shipping = ({auth}) => {
  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);
  const [address, setAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });
  const [address1, setAddress1] = useState('');
  
  let input;
  useEffect(() => {
    initAutocomplete(input);
  }, []);

  let autocomplete;

  var componentForm = {
    inputAddress: 'short_name',
    inputAddress2: 'long_name',
    inputCity: 'long_name',
    inputState: 'short_name',
    postal_code: 'short_name'
  };

  function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), {types: ['geocode']});

    autocomplete.setFields(['address_component']);
  
    autocomplete.addListener('place_changed', fillInAddress);
  }

  function fillInAddress() {
    var place = autocomplete.getPlace().address_components;
    
    setAddress({
      address1: `${place[0].short_name} ${place[1].short_name}`,
      city: place[3].short_name,
      state: place[5].short_name,
      country: place[6].long_name,
      zipCode: place[7].short_name
    });
    // for (var component in componentForm) {
    //   document.getElementById(component).value = '';
    //   document.getElementById(component).disabled = false;
    // }
  
    // for (var i = 0; i < place.address_components.length; i++) {
    //   var addressType = place.address_components[i].types[0];
    //   if (componentForm[addressType]) {
    //     var val = place.address_components[i][componentForm[addressType]];
    //     document.getElementById(addressType).value = val;
    //   }
    // }
  }
  console.log('address :', address);
  console.log('address1 :', address1);
  // function geolocate() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       var geolocation = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
  //       var circle = new google.maps.Circle(
  //           {center: geolocation, radius: position.coords.accuracy});
  //       autocomplete.setBounds(circle.getBounds());
  //     });
  //   }
  // }

  const saveAddress = (ev) => {
    ev.preventDefault();
    console.log('***** Saving Address *****');
    
    const headers = () => {
      const token = window.localStorage.getItem('token');
      return {
        headers: {
          authorization: token
        }
      };
    };

    const newAddress = {...address};
    console.log(newAddress);
    newAddress.userId = auth.id;
    axios.post('/api/addresses', newAddress, headers())
      .then(res => console.log(res.data))
      .catch(ex => console.log(ex));
    
  };

  return (
    <div className='mt-4'>
      <form className='w-100' id='address' onSubmit = {(ev) => saveAddress(ev)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFirstName">First Name</label>
            <input className="form-control" id="inputFirstName" value={firstName} onChange={ev => setFirstName(ev.target.value)}></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLastName">Last Name</label>
            <input className="form-control" id="inputLastName" value={lastName} onChange={ev => setLastName(ev.target.value)}></input>
          </div>
        </div>

        <ListAddresses userId = {auth.id}/>

        <div>
          <div className='form-group'>
            <label> Or Enter New Shipping Address</label>
            {/* <label htmlFor="autocomplete">Address</label> */}
            <input type="text" className="form-control mb-2" id="autocomplete" placeholder="Start typing the first line of your address" ref={el => input=el}></input>
            <button className='btn btn-link' type='button' data-toggle='collapse' data-target='#manualAddress' aria-expanded='false' aria-controls='manualAddress'>Enter Address Manually</button>
          </div>
        </div>

        <div className='collapse' id='manualAddress'>
          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input className="form-control" id="inputAddress" value={address.address1} onChange={ev => setAddress({...address, address1: ev.target.value})}></input>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Address 2</label>
            <input className="form-control" id="inputAddress2" value={address.address2} onChange={ev => setAddress({...address, address2: ev.target.value})}></input>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input className="form-control" id="inputCity" value={address.city} onChange={ev => setAddress({...address, city: ev.target.value})} placeholder='Apt, Unit, Suite, etc.'></input>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputState">State</label>
              <input className="form-control" id="inputState" value={address.state} onChange={ev => setAddress({...address, state: ev.target.value})} placeholder='CA'></input>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="postal_code">Zip</label>
              <input className="form-control" id="postal_code" value={address.zipCode} onChange={ev => setAddress({...address, zipCode: ev.target.value})} placeholder='12345'></input>
            </div>
          </div>
        </div>

        <div>
          <button className='btn btn-dark mb-4' type='button'>Save Address</button>
          <br/><button onClick = {(ev)=> saveAddress(ev)}> Testing Save Address (Remove)</button>
        </div>

      </form>
    </div>
  );
};

export default Shipping;