import React, { useEffect, useState } from "react";
import { Product } from "../types/Product.type";
import { useAppSelector } from "../store/hooks/useRedux";

export const useFilterAndSortProducts = () => {
  const allProducts = useAppSelector((state) => state.products.products);
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (!allProducts) return;
    setProducts(allProducts);
  }, [allProducts]);

  function updateProductsBySearch(searchTerm: String) {
    const filteredProducts=searchTerm
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allProducts;
    setProducts(filteredProducts);
  }

  function updateProductsBySort(sortBy: String) {

  }

  return {
    updateProductsBySearch,
    updateProductsBySort,
    products,
  };
};
