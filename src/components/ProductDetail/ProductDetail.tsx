import React from "react";
import { Product } from "../../types/Product.type";
import classes from "./ProductDetail.module.css";

const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <div className={classes.product_detail}>
      <h1>{product.name}</h1>
      <img className={classes.image} src={product.image_url} alt={product.name} />
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
