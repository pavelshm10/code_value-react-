import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CloseIcon from '@mui/icons-material/Close';
import { Product } from "../../types/Product.type";
import { productValidationSchema } from "../../validation/product.validation";
interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
}

function ProductDialog({ open, onClose, product }: ProductDialogProps) {
  const initialValues = {
    id: product?.id || -1,
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    image_url: product?.image_url || "",
    creation_date: product?.creation_date,
  };

  const handleSubmit = (values: Product) => {
    
    // onSave(values as Product);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {product ? "Edit Product" : "Add Product"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={productValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleChange, values, touched, errors }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={touched.name && Boolean(errors.name)}
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Field
                as={TextField}
                label="Price"
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={touched.price && Boolean(errors.price)}
                helperText={<ErrorMessage name="price" />}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default ProductDialog;
