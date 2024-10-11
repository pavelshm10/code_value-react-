import React, { useState } from "react";
import styles from "./header.module.scss";

function Header() {
    return (
    <h1 className={styles.header} >
        My Store
    </h1>
  );
}

export default Header;

