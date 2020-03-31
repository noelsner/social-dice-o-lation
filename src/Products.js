import React from 'react';
import { Row, Container } from 'react-bootstrap';
import inCartQuantity from './cart/inCartQuantity';

const Products = ({ products, addToCart, lineItems })=> {
  
  return (
    <div>
      <div className='products'>      
        <ul>
          {
            products.map( product => {

              const disableButton = Boolean((product.quantity - inCartQuantity(product.id, lineItems)) < 1);

              return (
                <li key={ product.id } className='d-flex flex-column justify-content-end bg-light'>
                  
                  <span className='product-pic-container'>
                    <a href={`#view=product&id=${product.id}`}><img src={product.imageURL} className='product-pic w-100 '/></a>
                  {/*<div className='pop-button btn btn-success w-100' onClick={()=> addToCart(product.id)}>Quick Add to Cart</div>*/}
                  </span>
                  <span className='m-0'>
                    <h5 className='m-0'><a href={`#view=product&id=${product.id}`}>{ product.name }</a></h5>
                  </span>
                  <span>
                    <div className='m-0'>Available Quantity: {product.quantity - inCartQuantity(product.id, lineItems)}</div>
                  </span>
                  <span>
                    <button disabled = {disableButton} onClick={ ()=> addToCart(product.id)} className='btn btn-success w-100 mt-2 text-white'>Add to Cart</button>                  
                  </span>
                  <span className='m-0'>
                    ${Number(product.price).toFixed(2)}
                  </span>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default Products;
