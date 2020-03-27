const inCartQuantity = (productId, lineItems) => { 
    const checkedOut = lineItems.find(lineItem => lineItem.productId === productId);
    if(checkedOut) {
      return checkedOut.quantity;
    }
    return 0;
  };

  export default inCartQuantity;