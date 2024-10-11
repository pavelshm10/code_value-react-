import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { products, productsData } from "../../slices/productsSlice";
import { Product } from "../../types/product";
import styles from "./navbar.module.scss";

function Navbar() { 
  const dispatch = useDispatch();
  const all_products = useSelector(productsData);
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
    const copy = [...all_products];
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
    dispatch(products(sorted));
  }

  function sortByValue(copy: []) {
    // const copy = [...all_products];
    // const sorted = copy.sort((a, b) => a.value - b.value);
    // return sorted;
  }

  return (
    <div className={styles.nav_bar}>
      <button className={styles.add_btn}>+ Add</button>
      <input
        className={styles.search_input}
        type="text"
        placeholder="search products"
      />
      <label className={styles.sort_select}>
        Sort by
        <select
          className={styles.select_input}
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
