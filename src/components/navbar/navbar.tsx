import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../types/Product.type";
import classes from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { addProduct, setSelectedProduct } from "../../store/product/productSlice";

interface NavbarProps {
  openProductDailog: () => void;
}

function Navbar({ openProductDailog }: NavbarProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const options = ["Name"];
  const selectRef = useRef(null);
  const [choice, setChoice] = useState();

  const handleChange = (event: any) => {
    setChoice(event.target.value);
    if (typeof event.target.value == "string") {
      sortByABC();
    }
    // else {
    //   sortByValue();
    // }
  };

  function sortByABC() {
    const copy = [...products];
    const sorted = copy.sort((a: Product, b: Product) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }

  function sortByValue(copy: []) {
    // const copy = [...all_products];
    // const sorted = copy.sort((a, b) => a.value - b.value);
    // return sorted;
  }

  function handleAddProduct(){
    openProductDailog();
    dispatch(setSelectedProduct(null))
  }

  return (
    <div className={classes.nav_bar}>
      <button className={classes.add_btn} onClick={handleAddProduct}>
        + Add
      </button>
      <input
        className={classes.search_input}
        type="text"
        placeholder="search products"
      />
      <label className={classes.sort_select}>
        Sort by
        <select
          className={classes.select_input}
          ref={selectRef}
          defaultValue={"default"}
          onChange={handleChange}
        >
          <option value={"default"} disabled>
            Choose an option
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Navbar;
