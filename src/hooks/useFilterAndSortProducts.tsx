import React, { useEffect, useState } from "react";
import { Product } from "../types/Product.type";
import { useAppSelector } from "../store/hooks/useRedux";
import { PRODUCT } from "../constants/product";

export const useFilterAndSortProducts = () => {
  const allProducts = useAppSelector((state) => state.products.products);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!allProducts.length) return;
    console.log("remove ",allProducts.length)
    setProducts(allProducts);
  }, [allProducts]);

  function updateProductsBySearch(searchTerm: String) {
    const filteredProducts = searchTerm
      ? products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      : allProducts;
    setProducts(filteredProducts);
  }

  function updateProductsBySort(sortField: String) {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortField === PRODUCT.NAME) {
        return a.name.localeCompare(b.name);
      } else if (sortField === PRODUCT.CREATION_DATE) {
        return (
          new Date(a.creation_date).getTime() -
          new Date(b.creation_date).getTime()
        );
      }
      return 0;
    });
    setProducts(sortedProducts);
  }

  return {
    updateProductsBySearch,
    updateProductsBySort,
    products,
  };
};
