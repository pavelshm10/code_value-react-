import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { Product } from "./types/Product.type";
import productsData from "./mock/data.json";
import classes from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import ProductDialog from "./components/ProductDialog/ProductDialog";
import { RootState } from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks/useRedux";
import { setProducts, setSelectedProduct } from "./store/product/productSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );

  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(setProducts(productsData));
    dispatch(setSelectedProduct(productsData[0]));
  }, [dispatch]);

  return (
    <>
      <h1 className={classes.title}>My Store</h1>
      <Navbar openProductDailog={() => setDialogOpen(true)} />

      <div className={classes.app_container}>
        <div className={classes.side_bar}>
          <ProductList
            products={products}
            openProductDailog={() => setDialogOpen(true)}
          />
        </div>
        <div className={classes.main}>
          {selectedProduct && <ProductDetail product={selectedProduct} />}
        </div>
      </div>
      {isDialogOpen && (
        <ProductDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default App;
