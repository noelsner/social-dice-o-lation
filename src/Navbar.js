import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const MyNavbar = ({ lineItems, logout, auth, cart }) => {
  const currentLineItems = lineItems.filter(lineItem => lineItem.orderId === cart.id);
  const cartSize = currentLineItems.reduce((sum, lineItem) => {
    return sum + lineItem.quantity
  }, 0);

  return (
    <Navbar bg='primary'  variant='dark' expand='sm' className='flex justify-content-between'>
      <Navbar.Brand href='#'>Social Dice-O-Lation</Navbar.Brand>
      <div>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#view'>Products</Nav.Link>
            <NavDropdown alignRight title='My Account' id='basic-nav-dropdown-align-right'>
              <NavDropdown.Item href='#view=account'>Details</NavDropdown.Item>
              <NavDropdown.Item href='#view=orders'>Order History</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout} className='dropdown-item'>Logout {`${auth.firstName} ${auth.lastName}`}</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#view=cart'><FontAwesomeIcon icon={faShoppingCart} />({cartSize})</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNavbar;