import React from 'react';
import { Row, Container } from 'react-bootstrap';

const Products = ({ products, addToCart, lineItems })=> {
  return (
    <div>
      <h2>Products</h2>
      <div className='products'>      
        <ul>
          {
            products.map( product => {
              const checkedOut = lineItems.find(lineItem => lineItem.productId === product.id);
              return (
                <li key={ product.id } className='d-flex flex-column justify-content-end bg-light'>
                  
                  <span className='product-pic-container'>
                    <a href={`#view=product&id=${product.id}`}><img src={product.imageURL} className='product-pic w-100 '/></a>
                    <div className='pop-button btn btn-success w-100' onClick={()=> addToCart(product.id)}>Quick Add to Cart</div>
                  </span>
                  <span className='m-0'>
                    <h3 className='m-0'><a href={`#view=product&id=${product.id}`}>{ product.name }</a></h3>
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
