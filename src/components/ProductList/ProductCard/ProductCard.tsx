import React from "react";
import classes from "./ProductCard.module.css";
import { Product } from "../../../types/Product.type";
import EditIcon from "@mui/icons-material/Edit";
import { setSelectedProduct } from "../../../store/product/productSlice";
import { useAppDispatch } from "../../../store/hooks/useRedux";

interface ProductCardProps {
  product: Product;
  openProductDailog: () => void;
}

function ProductCard({ product, openProductDailog }: ProductCardProps) {
  const dispatch = useAppDispatch();

  function handleEditProduct() {
    dispatch(setSelectedProduct(product));
  }

  return (
    <div className={classes.product_card} onClick={handleEditProduct}>
      <img
        className={classes.product_image}
        src={product.image_url}
        alt={product.name}
      />
      <h2 className={classes.product_name}>{product.name}</h2>
      <p className={classes.product_price}>${product.price.toFixed(2)}</p>
      <button onClick={openProductDailog} aria-label="Edit Product">
        <EditIcon />
      </button>
    </div>
  );
}

export default ProductCard;
