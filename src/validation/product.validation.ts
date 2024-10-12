import * as Yup from 'yup';

export const productValidationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .max(30, 'Name cannot exceed 30 characters'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be greater than zero'),
  });