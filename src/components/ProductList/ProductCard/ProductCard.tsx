import React from "react";
import classes from "./ProductCard.module.css";
import { Product } from "../../../types/Product.type";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  removeProduct,
  setSelectedProduct,
} from "../../../store/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";

interface ProductCardProps {
  product: Product;
  openProductDailog: () => void;
}

function ProductCard({ product, openProductDailog }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );
  function handleEditProduct() {
    dispatch(setSelectedProduct(product));
  }

  function handleDeleteProduct(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(setSelectedProduct(null));
    dispatch(removeProduct(product.id));
  }

  return (
    <div
      className={`${classes.product_card} ${
        selectedProduct && selectedProduct.id === product.id
          ? classes.selected_product_card
          : ""
      }`}
      onClick={handleEditProduct}
    >
      <div>
        <img
          className={classes.product_image}
          src={product.image_url}
          alt={product.name}
        />
        <h2 className={classes.product_name}>{product.name}</h2>
        <p className={classes.product_price}>${product.price.toFixed(2)}</p>
      </div>
      <div className={classes.buttons_container}>
        <IconButton onClick={openProductDailog} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDeleteProduct} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ProductCard;
