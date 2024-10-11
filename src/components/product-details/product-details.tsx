import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productDetail,
  products,
  productsData,
  product_detail,
} from "../../slices/productsSlice";
import { Product } from "../../types/product";
import styles from "./product-details.module.scss";

function ProductDetails() {
  const dispatch = useDispatch();
  const current_product = useSelector(productDetail);
  const all_products = useSelector(productsData);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setUrl(current_product.url);
    setName(current_product.name);
    setDescription(current_product.description);
    setPrice(current_product.price);
  }, [current_product]);

  const saveProduct = (event: any) => {
    event.preventDefault();

    const update_product: Product = {
      id: current_product.id,
      name: name,
      description: description,
      price: price,
      url: url,
      create_date: getToday(),
    };
    const ind = all_products.findIndex(
      (product: Product) => product.id === current_product.id
    );
    const copy = [...all_products];
    copy[ind] = update_product;
    dispatch(products(copy));
    dispatch(product_detail(update_product));
  };

  function getToday() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <form onSubmit={saveProduct} className={styles.details}>
      <img className={styles.prod_img} src={url} />
      <div className={styles.input_container}>
        <label htmlFor="url">Image URL</label>
        <br />
        <input
          className={styles.input}
          type="text"
          id="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          className={styles.input}
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className={styles.input_container}>
        <label htmlFor="description">Description</label>
        <br />
        <input
          className={styles.input}
          id="description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="price">Price</label>
        <br />
        <input
          className={styles.input}
          id="price"
          type="text"
          onChange={(e) => setPrice(+e.target.value)}
          value={price}
        />
      </div>
      <button className="btn">Save</button>
    </form>
  );
}

export default ProductDetails;
