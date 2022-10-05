import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Ratings from "./Ratings";
import { Helmet } from "react-helmet-async";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { getError } from "../utils/utils";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_fail":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST" });
    axios
      .get(`http://localhost:5005/api/product/slug/${slug}`)
      .then((response) =>
        dispatch({ type: "FETCH_SUCCESS", payload: response.data })
      )
      .catch((err) => {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      });
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHanddler = () => {
    const existItem = cart.cartItems.find((x) => {
      return x._id === product._id;
    });
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = axios
      .get(`http://localhost:5005/api/product/${product._id}`)
      .then(() => {
        if (data.countInStock < quantity) {
          window.alert("Sorry. Product is out of stock");
          return;
        }
      });
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    navigate("/cart");
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="img-large" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Ratings
                rating={product.rating}
                numReviews={product.numReviews}
              ></Ratings>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d.grid">
                      <Button onClick={addToCartHanddler} variant="primary">
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
    </div>
  );
}

export default ProductScreen;
