import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      setTimeout(() => {
        window.location.assign("/");
      }, 7000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div className="column">
      <Jumbotron>
        <h1
          className="successful"
          style={{ fontSize: "55px", lineHeight: "1.2" }}
        >
          Success!
        </h1>
        <h2
          className="purchase"
          style={{ fontSize: "35px", lineHeight: "1.5" }}
        >
          Thank you for your purchase! You can now view the full story in your
          Order History!
        </h2>
        <h2
          className="purchase"
          style={{ fontSize: "35px", lineHeight: "1.5" }}
        >
          You will now be redirected to the home page
        </h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
