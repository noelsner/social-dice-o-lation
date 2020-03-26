import React, {useState, useEffect} from 'react';

const AdjustQuantity = ({lineItemQuantity}) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(()=>{
        if(lineItemQuantity){
            setQuantity(lineItemQuantity);
        };
    },[]);

    return ( 
        <div>
            <select value = {quantity} onChange = {(ev)=> setQuantity(ev.target.value)}>
                <option value = '1'>1</option>
                <option value = '2'>2</option>
                <option value = '3'>3</option>
                <option value = '4'>4</option>
                <option value = '5'>5</option>
                <option value = '6'>6</option>
            </select>
        </div>
    );
};

export default AdjustQuantity;