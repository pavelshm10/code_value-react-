import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { Product } from "./types/Product.type";
import productsData from "./mock/data.json";
import classes from "./App.module.css";
// import Navbar from "./components/Navbar/Nabar";
import { useDispatch, useSelector } from "react-redux";
import ProductDialog from "./components/ProductDialog/ProductDialog";
import { RootState } from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks/useRedux";
import { setProducts, setSelectedProduct } from "./store/product/productSlice";
import Navbar from "./components/Navbar/Navbar";
import { useFilterAndSortProducts } from "./hooks/useFilterAndSortProducts";

const App = () => {
  const dispatch = useAppDispatch();
  const { updateProductsBySearch, updateProductsBySort, products } =
    useFilterAndSortProducts();

  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(setProducts(productsData));
  }, [dispatch]);

  return (
    <>
      <h1 className={classes.title}>My Store</h1>
      <Navbar
        filterProducts={(searchTerm) => updateProductsBySearch(searchTerm)}
        sortProducts={(sortBy) => updateProductsBySort(sortBy)}
        openProductDailog={() => setDialogOpen(true)}
      />

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
