import React, { useEffect, useState } from "react";
import styles from "./products.module.scss";
// import products from "../../data.json";
import Navbar from "../navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  productDetail,
  products,
  productsData,
  product_detail,
} from "../../slices/productsSlice";
import { Product } from "../../types/product";

function Products() {
  const dispatch = useDispatch();
  const all_products = useSelector(productsData);
  const product = useSelector(productDetail);

  const handleClick = (newProduct: Product) => {
    colorWhite(product.id);
    dispatch(product_detail(newProduct));
    colorGrey(newProduct.id);
  };

  // init default
  useEffect(() => {
    colorGrey(product.id);
  }, []);

  const deleteProduct = (id: number) => {
    const update_products = all_products.filter(
      (product: Product) => product.id !== id
    );
    dispatch(products(update_products));
    if (id === product.id) {
      dispatch(product_detail(update_products[0]));
      colorGrey(update_products[0].id);
    }
  };

  const colorGrey = (id: number) => {
    const new_prod_html = document.getElementById(id.toString()) as HTMLElement;
    new_prod_html.style.backgroundColor = "grey";
  };

  const colorWhite = (id: number) => {
    const old_prod_html = document.getElementById(id.toString()) as HTMLElement;
    old_prod_html.style.backgroundColor = "white";
  };

  return (
    <div className={styles.products}>
      <Navbar />
      {all_products.map((product: Product) => {
        return (
          <div
            key={product.id}
            id={product.id.toString()}
            className={styles.product_container}
          >
            <img
              className={styles.product_img}
              src={product.url}
              alt={product.name}
              onClick={() => handleClick(product)}
            />
            <div className={styles.product_text}>
              <div>{product.name}</div>
              <div onClick={() => handleClick(product)}>
                {product.description}
              </div>
            </div>
            <button
              className="btn"
              onClick={() => deleteProduct(product.id)}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
