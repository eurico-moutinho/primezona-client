import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./pages/Header";
import ProductScreen from "./components/ProductScreen"


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/product/:slug' element={<ProductScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
