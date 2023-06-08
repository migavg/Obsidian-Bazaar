import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <div>
      <div className="container has-background-black mt-6 p-6">
        <Link className="has-text-white" to="/">← Back to Products</Link>

        {user ? (
          <div className="p-2">
            <h2 className="has-text-white is-size-3">
              Order History for {user.cryptonym}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="has-text-white">
                <h3>
                   Date purchased: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className=" is-flex is-flex-wrap-wrap">
                  {/* add story and paywall feilds to args */}
                  {order.products.map(({ _id, name, price, story, paywall }, index) => (
                    <div key={index} className="card mb-6">
                      <Link to={`/products/${_id}`}>
                        <p className="is-size-4 has-text-white has-text-centered">{name}</p>
                      </Link>
                      {/* <div>
                        <span>${price}</span>
                      </div> */}
                      {/* paywall is checked if true or false to display as "locked" or displayed normally */}
                      {paywall ? (
                        <div>
                          <p>Locked</p>
                        </div>
                        ) : (
                          <div>
                            <p className="has-text-centered">{story}</p>
                          </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default OrderHistory;
