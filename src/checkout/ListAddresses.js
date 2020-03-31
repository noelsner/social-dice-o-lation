import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ListAddresses = ({userId, cart, setCart}) => {

    const [addresses, setAddresses] = useState([]);

    const headers = () => {
        const token = window.localStorage.getItem('token');
        return {
          headers: {
            authorization: token
          }
        };
      };

    useEffect( ()=> {
        axios.get(`/api/userAddress/${userId}`, headers())
        .then(response => setAddresses(response.data))
    }, [])

    const addAddress = (addressId) => {
        setCart({...cart, addressId: addressId});
    };

    return (
        <div>
            <label>Choose Shipping Address</label>
            <form className="d-flex align-items-center">
            {
            addresses.map(address => {
                
                return (
                    <div key = {address.id}> 
                        <div  className = "input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text"> 
                                    <input type="radio" name="address" aria-label="Radio button for following text input" onClick = {()=>addAddress(address.id)}></input>
                                </div>
                            </div>
                            <div className = "card card-body">
                                <span>{address.address1} </span>
                                {address.address2 && <span>{address.address2}</span>} 
                                <span>{address.city}, {address.state} {address.zipCode} </span> 
                            </div>
                        </div>   
                    </div>
                );
            } )
            }
            </form>
        </div>
    )
}
export default ListAddresses;