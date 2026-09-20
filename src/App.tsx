import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Product, ProductFormState, ProductFormErrors } from "./types/types";
import { validateProductForm } from "./validate";

const initialProducts: Product[] = [
  { id: 1, name: "Mechanical Keyboard", price: 89.99, inStock: true, onSale: false },
  { id: 2, name: "USB-C Hub", price: 34.5, inStock: false, onSale: false },
  { id: 3, name: "27\" Monitor", price: 219, inStock: true, onSale: false },
  { id: 4, name: "Wireless Mouse", price: 24.99, inStock: true, onSale: false },
  { id: 5, name: "Webcam 1080p", price: 49, inStock: false, onSale: false },
  { id: 6, name: "Laptop Stand", price: 29.95, inStock: true, onSale: false },
];

const emptyForm: ProductFormState = { name: "", price: "" };

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const visibleProducts = inStockOnly
    ? products.filter((p) => p.inStock)
    : products;
  const saleCount = products.filter((p) => p.onSale).length;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateProductForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
    setProducts([
      ...products,
      {
        id: nextId,
        name: form.name.trim(),
        price: Number(form.price),
        inStock: true,
        onSale: false,
      },
    ]);
    setForm(emptyForm);
  }

  function toggleSale(id: number) {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, onSale: !p.onSale } : p))
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl p-6 text-slate-900">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Product catalog</h1>
          <p className="text-sm text-slate-600">
            {visibleProducts.length} products
          </p>
        </div>

        <div className="flex items-center gap-4">
          {saleCount > 0 && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
              {saleCount} on sale
            </span>
          )}
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4"
            />
            In stock only
          </label>
        </div>
      </header>

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

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((p) => (
          <li
            key={p.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-medium">{p.name}</h2>
              <span
                className={
                  p.inStock
                    ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
                    : "rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600"
                }
              >
                {p.inStock ? "In stock" : "Sold out"}
              </span>
            </div>
            <p className="text-lg">${p.price.toFixed(2)}</p>
            <button
              type="button"
              onClick={() => toggleSale(p.id)}
              className="mt-auto self-start rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
            >
              {p.onSale ? "Remove sale" : "Mark on sale"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
