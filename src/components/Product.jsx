import axios from 'axios';
import React, { useContext } from 'react'
import {Card, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { Store } from '../Store';
import Ratings from './Ratings';

function Product(props) {
    const {product} = props;

    const { state, dispatch: ctxDispatch} = useContext(Store);
    const { cart: { cartItems},} = state;

    const addCartHandler = async (item) => {
      const existItem = cartItems.find(x =>{ return (x.slug===product.slug)})
      const quantity = existItem ? existItem.quantity +1 : 1;
      const {data} = await axios.get(`http://localhost:5005/api/product/${item.slug}`);
      if(data.countInStock < quantity){
          window.alert('Sorry. Product is out of stock');
          return;
      }
      ctxDispatch({
          type:'CART_ADD_ITEM',
          payload: {...item, quantity},
      })
  }

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
                    {product.countInStock === 0 ? (
                    <Button variant='light' disabled>
                      Out of Stock
                      </Button>
                    ) : (
                    <Button onClick={()=> addCartHandler(product)}>Add to cart</Button>
                    )}
                    </Card.Body>
            </Card>

  )
}

export default Product