import React from 'react'
import {useParams} from 'react-router-dom'
import { useEffect, useReducer } from "react";
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

const reducer = (state, action) =>{
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
        return {...state, product: action.payload, loading: false};
    case 'FETCH_fail':
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}

function ProductScreen() {
    const {slug} = useParams();

    const [{loading, error, product}, dispatch] = useReducer(reducer,{
      product:[],
      loading: true,
      error:'',
    })
  
    useEffect(()=>{
      dispatch({type:'FETCH_REQUEST'});
      axios
      .get(`http://localhost:5005/api/products/slug/${slug}`)
      .then(response => 
        dispatch({type:'FETCH_SUCCESS', payload: response.data})
        ).catch(err =>{dispatch({type:'FETCH_FAIL', payload: err.message})})
    }, [slug]);

  return (
    loading ? (
    <div>Loading...</div>)
    : error ? (
    <div>{error}</div>)
    : (<div>
      <Row>
        <Col md={6}>
          <img className='img-large'
          src={product.image}
          alt={product.name}/>
        </Col>
        <Col md={3}></Col>
        <Col md={3}></Col>
      </Row>
    </div>)
  )
}

export default ProductScreen