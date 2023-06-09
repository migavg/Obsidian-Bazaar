import React, { useEffect } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Hero from "../components/Hero";
import { redirect, useSearchParams, useNavigate } from "react-router-dom";
import Success from "./Success";

const Home = () => {
  const [queries, setQueries] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (queries.get("success")) {
      navigate(`/success?session_id=${queries.get("session_id")}`);
    }
  }, [queries]);

  return (
    <div>
      <Hero />
      <div className="container">
        <ProductList />
        <Cart />
      </div>
    </div>
  );
};

export default Home;
