import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {LinkContainer} from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'
import { Badge, Nav, NavDropdown } from 'react-bootstrap'
import { Store } from '../Store'
import {ToastContainer} from 'react-toastify';


function Header() {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} =state;

  const signoutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
  }

  return (
    <div className='d-flex flex-column site-container'>
      <ToastContainer position='bottom-center' limit={1}/>
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
                    {cart.cartItems.reduce((a,c) => a+ c.quantity, 0)}
                  </Badge>
                )}
              </NavLink>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                  <LinkContainer to='/profile'>
                      User Profile
                  </LinkContainer>
                  <LinkContainer to='/orderhistory'>
                      Order History
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavLink className="dropdown-item" to='#signout' onClick={signoutHandler}>
                  Sign Out
                </NavLink>
                </NavDropdown>
              ):(
                <NavLink className="nav-link" to='/signin'>
                  Sign In
                </NavLink>
              )}
            </Nav>
            </Container>
          </Navbar>
        </header>
    </div>
  )
}

export default Header