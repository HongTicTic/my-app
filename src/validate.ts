import type { ProductFormState, ProductFormErrors } from "./types/types";

// Pure function: returns a fresh errors object, never mutates its input.
export function validateProductForm(form: ProductFormState): ProductFormErrors {
  const errors: ProductFormErrors = {};
  const name = form.name.trim();
  const price = form.price.trim();

  if (name === "") {
    errors.name = "Name is required.";
  }

  if (price === "" || Number.isNaN(Number(price))) {
    errors.price = "Price must be a number.";
  } else if (Number(price) <= 0) {
    errors.price = "Price must be greater than 0.";
  }

  return errors;
}