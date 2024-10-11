import React from "react";
import Header from "./components/header/header";
import Products from "./components/products/products";
import ProductDetails from "./components/product-details/product-details";
import { useDispatch, useSelector } from "react-redux";
import productsJson from "./data.json";
import "./App.scss";
import { products, product_detail } from "./slices/productsSlice";

function App() {
  const dispatch = useDispatch();
  dispatch(products(productsJson));
  dispatch(product_detail(productsJson[0]));
  return (
    <div className="store">
      <Header />
      <div className="products-container">
        <Products />
        <ProductDetails />
      </div>
    </div>
  );
}

export default App;
