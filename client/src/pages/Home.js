import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Hero from "../components/Hero";


const Home = () => {
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
