import { useEffect, useReducer } from "react";
import Product from "../components/Product";
import axios from 'axios';
import {Col, Row, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from 'react-helmet-async';
// React & Node ECommerce Tutorial For Beginners 2022 [MERN Stack ECommerce Website]
const reducer = (state, action) =>{
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
        return {...state, products: action.payload, loading: false};
    case 'FETCH_fail':
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}

function HomePage() {
  const [{loading, error, products}, dispatch] = useReducer(reducer,{
    products:[],
    loading: true,
    error:'',
  })

  useEffect(()=>{
    dispatch({type:'FETCH_REQUEST'});
    axios
    .get('http://localhost:5005/api/products')
    .then(response => 
      dispatch({type:'FETCH_SUCCESS', payload: response.data})
      ).catch(err =>{dispatch({type:'FETCH_FAIL', payload: err.message})})
  }, []);

  return (
    <main>
      <Helmet>
        <title>Primezona</title>
      </Helmet>
        <h1>Featured Products</h1>
        <div className='products'>
        { loading? (<div>Loading...</div>) : error? (
        <div>{error}</div>) : (<Container>
          <Row>
          {products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product>
            </Col>
          ))}
        </Row></Container>
        )}
        </div>
      </main>
  );
}

export default HomePage;
