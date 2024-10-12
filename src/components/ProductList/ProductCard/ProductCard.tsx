import React from "react";
import classes from "./ProductCard.module.css";
import { Product } from "../../../types/Product.type";
import EditIcon from "@mui/icons-material/Edit";

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
}

function ProductCard({
  product,
  onSelectProduct,
  onEditProduct,
}: ProductCardProps) {
  return (
    <div
      className={classes.product_card}
      onClick={() => onSelectProduct(product)}
    >
      <img
        className={classes.product_image}
        src={product.image_url}
        alt={product.name}
      />
      <h2 className={classes.product_name}>{product.name}</h2>
      <p className={classes.product_price}>${product.price.toFixed(2)}</p>
      <button onClick={() => onEditProduct(product)} aria-label="Edit Product">
        <EditIcon />
      </button>
    </div>
  );
}

export default ProductCard;
