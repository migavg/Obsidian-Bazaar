import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // useEffect function to UPDATE_PRODUCTS action to show corresponding product data
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  // filterProducts function if the currentCategory is changed change the product state with
  // products in that category
  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }
    // return list of filtered products that are in that category._id
    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="container">
      <h2 className="has-text-white is-size-2 has-text-centered pt-6" id="products">Our Products:</h2>
      {state.products.length ? (
        <div className="columns is-flex is-flex-wrap-wrap">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              name={product.name}
              story={product.story}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {/* render of loading icon when data is laoding or not present */}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
