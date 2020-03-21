import React from 'react';

const Products = ({ products, addToCart, lineItems })=> {

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          products.map( product => {

            const checkedOut = lineItems.find(lineItem => lineItem.productId === product.id);
            
            return (
              <li key={ product.id }>
                <span>
                <a href={`#view=product&id=${product.id}`}>{ product.name }</a>
                </span>
                <span>
                ${
                  Number(product.price).toFixed(2)
                }
                </span>
                <span>
                Available Quantity: { product.qty }
                </span>
                <button onClick={ ()=> addToCart(product.id)}>Add to Cart</button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
