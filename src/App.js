import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./pages/Header";
import ProductScreen from "./components/ProductScreen"
import { Container } from "react-bootstrap";


function App() {
  return (
    <div className="App">
      <Header/>
      <Container className='mt-3'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/product/:slug' element={<ProductScreen/>}/>
      </Routes>
      </Container>
    </div>
  );
}

export default App;
