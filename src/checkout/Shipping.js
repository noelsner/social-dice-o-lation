import React, { useState } from 'react';

const Shipping = ({auth}) => {
  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);

  var placeSearch, autocomplete;

  var componentForm = {
    inputAddress: 'short_name',
    inputAddress2: 'long_name',
    inputCity: 'long_name',
    inputState: 'short_name',
    postal_code: 'short_name'
  };

  function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), {types: ['geocode']});
  
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(['address_component']);
  
    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
  }

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
  
    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }
  
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  }

  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle(
            {center: geolocation, radius: position.coords.accuracy});
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  return (
    <div className='mt-4'>
      {/* <script 
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBggXHae8eprQvD9rWBkKoRC1DxXnQIMeQ&libraries=places&callback=initAutocomplete"
      async defer>
    </script> */}
      <form className='w-100'>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFirstName">First Name</label>
            <input type="text" className="form-control" id="inputFirstName" value={firstName} onChange={ev => setFirstName(ev)}></input>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLastName">Last Name</label>
            <input type="text" className="form-control" id="inputLastName" value={lastName} onChange={ev => setLastName(ev)}></input>
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
              <label htmlFor="postal_code">Zip</label>
              <input type="text" className="form-control" id="postal_code"></input>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Shipping;