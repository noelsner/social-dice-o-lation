import React, {useState, useEffect} from 'react';
import axios from 'axios';
const AdjustQuantity = ({lineItemQuantity, lineItemId, updateLineItems}) => {
    const [quantity, setQuantity] = useState(0);
    const [status, setStatus] = useState('');
    const headers = {};
    //status - not enough quantity
    //status - quantity updated

    useEffect(()=>{
        if(lineItemQuantity){
            setQuantity(lineItemQuantity);
        };
    },[]);

    useEffect(()=>{
        const token = window.localStorage.getItem('token');
        headers['authorization'] = token;
    },[]);
    
    const updateQuantity = async (newQuantity) => {
        await axios.put('/api/getLineItems',{lineItemId: lineItemId, newQuantity: newQuantity} , headers)
        .then( response => {
            setQuantity(response.data.quantity);
            setStatus('Quantity Updated');
            updateLineItems(response.data);
        });
    };

    return ( 
        <div>
            <select value = {quantity} onChange = {(ev)=> updateQuantity(ev.target.value) }>
                <option value = '1'>1</option>
                <option value = '2'>2</option>
                <option value = '3'>3</option>
                <option value = '4'>4</option>
                <option value = '5'>5</option>
                <option value = '6'>6</option>
            </select>
            <span>{status}</span>
        </div>
    );
};

export default AdjustQuantity;