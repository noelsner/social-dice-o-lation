import React from 'react';

const ProductDetailsPage = ({product}) => {
  console.log(product);
  return (
    <div>
      <h1> {product.name} Details Page</h1>
      {/* <p> {product.description} </p> */}
    </div>
  );
};

export default ProductDetailsPage;