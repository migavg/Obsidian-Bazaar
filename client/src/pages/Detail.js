import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
import obAnimated from "../assets/obAnimated.gif"

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };

  return (

    <div className="container has-background-black mt-6">
      {currentProduct && cart ? (
        <div className="p-6">
          <Link className="has-text-white" to="/">← Back to Products</Link>



          <h2 className="has-text-white has is-size-1 has-text-centered">{currentProduct.name}</h2>
          {/* if paywall is 'true' and purchased is 'false' display message directing user to purchase instead of story,
              if paywall is 'false' or purchased is 'true' story is displayed */}
          {currentProduct.paywall && !currentProduct.purchased ? (
            <p>{currentProduct.story}</p>
          ) : (
            <p className="has-text-white is-size-4 has-text-centered"> You forgot your tin foil hat!! 
              Purchase the product to unlock the Conspiracy! For the Obsidian Eye will show you the truth...
              You can find this story in your order history if previously purchased.
            </p>
          )}



          <p className="has-text-white has-text-centered pt-6 is-size-3">
            <strong className="has-text-white">Price: </strong>${currentProduct.price}{" "}
          </p>

          <div className="is-flex is-justify-content-center">  <img className="" src={obAnimated}></img></div>

          <div className="has-text-centered pt-3">
            <button className="button is-dark m-2" onClick={addToCart}>Add to Cart</button>
            <button
              className="button is-danger m-2"
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </div>

        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </div>

  );
}

export default Detail;
