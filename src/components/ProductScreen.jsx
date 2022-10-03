import React from 'react'
import {useParams} from 'react-router-dom'
import { useEffect, useReducer } from "react";
import axios from 'axios';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Ratings from './Ratings';
import {Helmet} from 'react-helmet-async';

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
      .get(`http://localhost:5005/api/product/slug/${slug}`)
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
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Helmet>
              <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Ratings rating={product.rating} numReviews={product.numReviews}>
              </Ratings>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
          <ListGroup variant='flush'>
          <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>{product.countInStock>0 ? 
                <Badge bg='success'>In Stock</Badge>
                :
                <Badge bg='danger'>Unavailable</Badge>
                }</Col>
              </Row>
            </ListGroup.Item>
            {product.countInStock >0 && (
              <ListGroup.Item>
                <div className='d.grid'>
                  <Button variant='primary'>
                    Add to Cart
                  </Button>
                </div>
            </ListGroup.Item>
            )}
          </ListGroup>
          </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>)
  )
}

export default ProductScreen