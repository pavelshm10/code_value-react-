import React, { useRef, useState } from "react";
import classes from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { setSelectedProduct } from "../../store/product/productSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { PRODUCT } from "../../constants/product";

interface NavbarProps {
  openProductDailog: () => void;
  filterProducts: (searchTerm: string) => void;
  sortProducts: (sortField: string) => void;
}

type product_field="name" | "creation_date";

function Navbar({
  openProductDailog,
  filterProducts,
  sortProducts,
}: NavbarProps) {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortField, setSortField] = useState<product_field>("name");

  const sortOptions = [
    { value: PRODUCT.NAME, label: "Name" },
    { value: PRODUCT.CREATION_DATE, label: "Creation Date" },
  ];

  function handleAddProduct() {
    openProductDailog();
    dispatch(setSelectedProduct(null));
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterProducts(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSort = (event: SelectChangeEvent) => {
    setSortField(event.target.value as product_field);
    sortProducts(event.target.value as string);
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
      <FormControl margin="normal">
        <InputLabel id="sort-select-label">Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          value={sortField}
          onChange={handleSort}
          label="Sort By"
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Navbar;
