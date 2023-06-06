import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();
    // remove from cart function that calls our REMOVE_FROM_CART action
  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    // deletes item data from cart by item._id
    idbPromise('cart', 'delete', { ...item });

  };
  // onChange function
  const onChange = (e) => {
    const value = e.target.value;
    // if statement if value is not equal to 0
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      // delete item date from cart
      idbPromise('cart', 'delete', { ...item });
      // else statement to dispatch UPDATE_CART_QUANTITY action to change the purchaseQuantity value
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      // When item is put in cart change purchaseQuantity value
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }
  // return html cart render
  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty: </span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
          className='remove-item'
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            REMOVE ITEM
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;