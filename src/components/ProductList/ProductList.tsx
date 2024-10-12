import React from "react";
import { Product } from "../../types/Product.type";
import classes from "./ProductList.module.css";
import ProductCard from "./ProductCard/ProductCard";

interface ProductListProps {
  products: Product[];
  // onSelectProduct: (product: Product) => void;
  // onEditProduct: (product: Product) => void;
  openProductDailog: () => void;
}

const ProductList = ({
  products,
  openProductDailog
}: ProductListProps) => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          openProductDailog={openProductDailog}
          // onEditProduct={onEditProduct}
        />
      ))}
    </div>
  );
};

export default ProductList;
