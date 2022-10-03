import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {LinkContainer} from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'
import { Badge, Cart, Nav } from 'react-bootstrap'
import { Store } from '../Store'


function Header() {
  const {state} = useContext(Store);
  const {cart} =state;
  return (
    <div>
        <header>
          <Navbar bg='dark' variant='dark' >
            <Container>
              <LinkContainer to='/'>
            <Navbar.Brand>Primezona</Navbar.Brand>
            </LinkContainer>
            <Nav className='me-auto'>
              <NavLink to='cart' className='nav-link'>Cart
                {cart.cartItems.length >0 &&(
                  <Badge pill bg='danger'>
                    {cart.cartItems.length}
                  </Badge>
                )}
              </NavLink>
            </Nav>
            </Container>
          </Navbar>
        </header>
    </div>
  )
}

export default Header