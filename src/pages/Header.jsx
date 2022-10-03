import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {LinkContainer} from 'react-router-bootstrap'


function Header() {
  return (
    <div>
        <header>
          <Navbar bg='dark' variant='dark' >
            <Container>
              <LinkContainer to='/'>
            <Navbar.Brand>Primezona</Navbar.Brand>
            </LinkContainer>
            </Container>
          </Navbar>
        </header>
    </div>
  )
}

export default Header