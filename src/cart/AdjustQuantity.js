import React from 'react';

const AdjustQuantity = ({lineItemQuantity}) => {

    return ( 
        <div>
            <select value = {lineItemQuantity}>
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