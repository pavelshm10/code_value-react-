import React, { useState } from "react";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { Product } from "./types/Product.type";
import productsData from "./data.json";
import classes from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import ProductDialog from "./components/ProductDialog/ProductDialog";
const App = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(productsData);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleAddProduct = () => {
    setSelectedProduct(null); // No product selected means adding a new one
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'creationDate'>) => {
    if (selectedProduct) {
      const updatedProducts = products.map((prod) =>
        prod.id === selectedProduct.id ? { ...prod, ...productData } : prod
      );
      setProducts(updatedProducts);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...productData,
        creation_date: new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
    }
    setDialogOpen(false);
  };

  //   {
  //     id: 1,
  //     name: "Product 1",
  //     price: 29.99,
  //     image_url: "url_to_image_1",
  //     description: "Description of Product 1"
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     price: 39.99,
  //     image_url: "url_to_image_2",
  //     description: "Description of Product 2"
  //   }
  // ];

  return (
    <>
      <h1 className={classes.title}>My Store</h1>
      <Navbar onAddProduct={handleAddProduct} />

      <div className={classes.app_container}>
        <div className={classes.side_bar}>
          <ProductList
            products={products}
            onSelectProduct={setSelectedProduct}
            onEditProduct={handleEditProduct}
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
          onSave={handleSaveProduct}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default App;
