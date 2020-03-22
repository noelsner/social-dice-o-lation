import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const MyNavbar = ({ lineItems, logout, auth }) => {
  return (
    <Navbar bg='primary'  variant='dark' expand='sm' className='flex justify-content-between'>
      <Navbar.Brand href='#'>Team-4-Store</Navbar.Brand>
      <div>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#view'>Products</Nav.Link>
            <NavDropdown title='My Account' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#view=account'>Details</NavDropdown.Item>
              <NavDropdown.Item href='#view=orders'>Order History</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout} className='dropdown-item'>Logout {auth.username}</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#view=cart'><FontAwesomeIcon icon={faShoppingCart} />({lineItems.length})</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNavbar;