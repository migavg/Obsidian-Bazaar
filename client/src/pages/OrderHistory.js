import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const OrderHistory = () => {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  const [expandedStories, setExpandedStories] = useState([]);

  const handleToggleExpand = (productId) => {
    if (expandedStories.includes(productId)) {
      setExpandedStories(expandedStories.filter((id) => id !== productId));
    } else {
      setExpandedStories([...expandedStories, productId]);
    }
  };

  const isStoryExpanded = (productId) => {
    return expandedStories.includes(productId);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}`;
    }
    return text;
  };

  const handleReadLess = (productId) => {
    setExpandedStories(expandedStories.filter((id) => id !== productId));
  };

  return (
    <div>
      <div className="container has-background-black mt-6 p-6">
        <Link className="has-text-white" to="/">
          ← Back to Products
        </Link>

        {user ? (
          <div className="p-2">
            <h2 className="has-text-white is-size-3">
              Order History for {user.cryptonym}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="has-text-white">
                <h3>
                  Date purchased:{" "}
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="is-flex is-flex-wrap-wrap">
                  {order.products.map(
                    ({ _id, name, price, story, paywall }, index) => (
                      <div key={index} className="card mb-6">
                        <Link to={`/products/${_id}`}>
                          <p className="is-size-4 has-text-white has-text-centered">
                            {name}
                          </p>
                        </Link>
                        {paywall ? (
                          <div>
                            <p>Locked</p>
                          </div>
                        ) : (
                          <div>
                            <p className="has-text-centered">
                              {isStoryExpanded(_id) || story.length <= 250 ? (
                                story
                              ) : (
                                <>
                                  {truncateText(story, 250)}
                                  <span
                                    onClick={() => handleToggleExpand(_id)}
                                    style={{
                                      cursor: "pointer",
                                      color: "#007FFF",
                                    }}
                                  >
                                    ...Read more
                                  </span>
                                </>
                              )}
                              {isStoryExpanded(_id) && (
                                <span
                                  onClick={() => handleReadLess(_id)}
                                  style={{
                                    cursor: "pointer",
                                    color: "#007FFF",
                                  }}
                                >
                                  ...Read less
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderHistory;
