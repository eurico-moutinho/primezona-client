import { useEffect, useReducer } from "react";
import {NavLink} from "react-router-dom";
import axios from 'axios';

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
        <h1>Featured Products</h1>
        <div className='products'>
        { loading? (<div>Loading...</div>) : error? (
        <div>{error}</div>) : products.map((products) =>
           (
            <div className='product' key={products.slug}>
                <NavLink to={`/product/${products.slug}`}>
                    <img src={products.image} alt={products.name} />
                </NavLink>
                <div className='product-info'>
                    <NavLink to={`/product/${products.slug}`}>
                        <p>{products.name}</p>
                    </NavLink>
                    <p><strong>{products.price}</strong></p>
                    <button>Add to cart</button>
                </div>
            </div>
          ))
        }
        </div>
      </main>
  );
}

export default HomePage;
