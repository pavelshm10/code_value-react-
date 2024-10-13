import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product.type";
import productsData from "../../mock/data.json";

interface ProductState {
  products: Product[];
  selectedProduct?: Product | null;
}

const initialState: ProductState = {
  products: productsData,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<Product>
    ) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
        creationDate: new Date().toISOString(),
      };
      state.products.push(newProduct);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (prod) => prod.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setProducts: (
      state,
      action: PayloadAction<Omit<Product, "id" | "creationDate">[]>
    ) => {
      const productsWithIdAndDate = action.payload.map((product) => ({
        ...product,
        id: Date.now() + Math.random(), // Generate unique IDs
        creationDate: new Date().toISOString(),
      }));
      state.products = productsWithIdAndDate;
    },
  },
});

export const {
  addProduct,
  editProduct,
  removeProduct,
  setProducts,
  setSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
