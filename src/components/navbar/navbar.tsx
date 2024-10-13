import React, { useRef, useState } from "react";
import classes from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { setSelectedProduct } from "../../store/product/productSlice";
import { Button, TextField } from "@mui/material";

interface NavbarProps {
  openProductDailog: () => void;
  filterProducts: (searchTerm: string) => void;
  sortProducts: (sortBy: string) => void;
}

function Navbar({
  openProductDailog,
  filterProducts,
  sortProducts,
}: NavbarProps) {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleAddProduct() {
    openProductDailog();
    dispatch(setSelectedProduct(null));
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterProducts(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    // sortProducts(event.target.value);
  };

  return (
    <div className={classes.navbar}>
      <Button onClick={handleAddProduct} variant="contained" color="primary">
        + Add
      </Button>
      <TextField
        label="Search Products By..."
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        margin="normal"
      />
    </div>
  );
}

export default Navbar;
