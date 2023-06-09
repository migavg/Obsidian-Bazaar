import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { name, _id, story, price, quantity } = item;

  const { cart } = state;

  const MAX_PREVIEW_CHARACTERS = 200;

  // addToCart function that adds the productItem by its productId to the cart
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    // if an ItemInCart use UPDATE_CART_QUANTITY action to update purchaseQuantity + 1
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      // ADD_TO_CART action is called and dispatched to put item in cart with a purchaseQuantity of 1
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  // productItem card display
  return (
    <div className="card ">
      <div className=" ">
        <Link
          className="has-text-white has-text-centered comforta"
          to={`/products/${_id}`}
        >
          <p className="is-size-4 pb-2">{name}</p>
          <p>{story.substring(0, MAX_PREVIEW_CHARACTERS)}...</p>
        </Link>
        <div className="has-text-centered">
          <div className="has-text-warning is-size-">
            {quantity} {pluralize("item", quantity)} in stock
          </div>
          <span className="has-text-danger">${price}</span>
        </div>
        <div className="buttons has-addons is-centered pt-4">
          {quantity > 0 ? (
            <button className="button is-light" onClick={addToCart}>
              Add to cart
            </button>
          ) : (
            <p className="oops" style={{ color: "white" }}>
              Too Late!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
