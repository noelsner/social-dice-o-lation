import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ListAddresses = ({userId}) => {

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

    return (
        <div>
            <label>Choose Shipping Address</label>
            <form className="d-flex align-items-center">
            {
            addresses.map(address => {
                console.log(address);
                return (
                    <div > 
                        <div key = {address.id} className = "input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="radio" aria-label="Radio button for following text input"></input>
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