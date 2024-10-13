import React from "react";
import { Product } from "../../types/Product.type";
import classes from "./ProductList.module.css";
import ProductCard from "./ProductCard/ProductCard";

interface ProductListProps {
  products: Product[];
  openProductDailog: () => void;
}

const ProductList = ({
  products,
  openProductDailog
}: ProductListProps) => {
  return (
    <div className={classes.product_list_container}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          openProductDailog={openProductDailog}
        />
      ))}
    </div>
  );
};

export default ProductList;
