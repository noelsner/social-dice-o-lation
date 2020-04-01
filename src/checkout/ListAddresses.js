import React from 'react';

const ListAddresses = ({cart, setCart, addressList}) => {

    /*
    useEffect( ()=> {
        axios.get(`/api/userAddress/${userId}`, headers())
        .then(response => setAddresses(response.data))
    }, [])
    */
    const addAddress = (addressId) => {
        setCart({...cart, addressId: addressId});
    };

    return (
        <div>
            <label>Choose Shipping Address</label>
            <form className="d-flex align-items-center flex-wrap">
            {
            addressList.map(address => {
                
                return (
                    <div key = {address.id} className = "w-100"> 
                        <div className = "input-group ">
                            <div className="input-group-prepend">
                                <div className="input-group-text"> 
                                    <input type="radio" name="address" aria-label="Radio button for following text input" onClick = {()=>addAddress(address.id)}></input>
                                </div>
                            </div>
                            <div className = "card card-body">
                                <span>
                                    {`
                                ${address.address1}  
                                ${address.address2},
                                ${address.city}, 
                                ${address.state} ${address.zipCode} 
                                    `}
                                </span> 
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