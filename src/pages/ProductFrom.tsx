import { useState } from "react";
import type React from "react";

import type {
  ProductDraft,
  ProductFormState,
  ProductFormErrors,
} from "../types";
import { validateProductForm } from "../validate";

interface ProductFormProps {
  onAdd: (name: string, price: number) => void;
  initialDraft?: ProductDraft;
}

export default function ProductForm({ onAdd, initialDraft }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormState>({
    name: initialDraft?.name ?? "",
    price: initialDraft?.price ?? "",
  });
  const [errors, setErrors] = useState<ProductFormErrors>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateProductForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onAdd(form.name.trim(), Number(form.price));
    setForm({ name: "", price: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mb-8 grid gap-4 rounded-lg border border-slate-200 p-4 sm:grid-cols-[1fr_10rem_auto] sm:items-start"
    >
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Product name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="mb-1 block text-sm font-medium">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="text"
          inputMode="decimal"
          value={form.price}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price}</p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 sm:mt-6"
      >
        Add product
      </button>
    </form>
  );
}