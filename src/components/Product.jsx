import React from 'react'
import {Card, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import Ratings from './Ratings';

function Product(props) {
    const {product} = props;
  return (

        <Card className='product'>
                <NavLink to={`/product/${product.slug}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                </NavLink>
                <Card.Body>
                <NavLink to={`/product/${product.slug}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </NavLink>
                    <Ratings rating={product.rating} numReviews={product.numReviews}></Ratings>
                    <Card.Text>{product.price}</Card.Text>
                    <Button className='btn-primary'>Add to cart</Button>
                    </Card.Body>
            </Card>

  )
}

export default Product