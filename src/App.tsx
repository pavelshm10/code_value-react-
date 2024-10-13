import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import productsData from "./mock/data.json";
import classes from "./App.module.css";
import ProductDialog from "./components/ProductDialog/ProductDialog";
import { useAppDispatch, useAppSelector } from "./store/hooks/useRedux";
import { setProducts } from "./store/product/productSlice";
import Navbar from "./components/Navbar/Navbar";
import { useFilterAndSortProducts } from "./hooks/useFilterAndSortProducts";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Pagination from "./components/Pagination/Pagination";

const App = () => {
  const dispatch = useAppDispatch();
  const { updateProductsBySearch, updateProductsBySort, products } =
    useFilterAndSortProducts();

  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );
  const [isDialogOpen, setDialogOpen] = useState(false);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // useEffect(() => {
  //   console.log("innnn");
  //   dispatch(setProducts(productsData));
  // }, []);

  return (
    <Router>
      <h1 className={classes.title}>My Store</h1>
      <Navbar
        filterProducts={(searchTerm) => updateProductsBySearch(searchTerm)}
        sortProducts={(sortField) => updateProductsBySort(sortField)}
        openProductDailog={() => setDialogOpen(true)}
      />
      <div className={classes.app_container}>
        <div className={classes.side_bar}>
          <ProductList
            products={currentProducts}
            openProductDailog={() => setDialogOpen(true)}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className={classes.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />{" "}
            {selectedProduct && (
              <Route
                path="/products/:id"
                element={<ProductDetail product={selectedProduct} />}
              />
            )}
          </Routes>
        </div>
      </div>
      {isDialogOpen && (
        <ProductDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          product={selectedProduct}
        />
      )}
    </Router>
  );
};

export default App;
