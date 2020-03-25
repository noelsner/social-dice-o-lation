import React from 'react';
import inCartQuantity from './inCartQuantity';

const ProductDetailsPage = ({product, addToCart, lineItems}) => {
  console.log(product)
  return (
    <div className='d-flex flex-row'>
      <div className='w-50 pr-2'>
        <img src={ product.imageURL } className='img-fluid'/>
      </div>
      <div className='w-50 px-2'>
        <div className='w-100 d-flex justify-content-between align-items-end'>
          <h2>{product.name}</h2>
          <h4>${Number(product.price).toFixed(2)}</h4>
        </div>
        <hr className='mb-2 mt-0' />
        <div>
          <u>Description:</u>
          <div> {product.description} </div>
        </div>
        <div className='mt-4'>Available Quantity: {product.qty - inCartQuantity(product.id, lineItems)}</div>
        <button onClick={ ()=> addToCart(product.id)} className='btn btn-success w-100 mt-2'>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;