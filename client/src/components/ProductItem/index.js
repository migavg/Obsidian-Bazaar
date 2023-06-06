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
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <p>{name}</p>
        <p>{story.substring(0, MAX_PREVIEW_CHARACTERS)}...</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
