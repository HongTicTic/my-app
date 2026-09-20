import type { ShopItem } from "../types";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../cart/useCart";

export default function ShopPage() {
  const { data: shopItems, loading, error } = useFetch<ShopItem[]>("/products.json");
  const { dispatch } = useCart();

  return (
    <section>
      <h1 className="mb-4 text-3xl! font-semibold">Shop</h1>

      {loading && (
        <ul aria-label="Loading products" className="grid gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="h-24 animate-pulse rounded-lg bg-slate-200" />
          ))}
        </ul>
      )}

      {error && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          Couldn't load products: {error}
        </p>
      )}

      {shopItems !== null && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {shopItems.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-2 rounded-lg border border-slate-200 p-4"
            >
              <p className="font-medium">{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "ADD_ITEM",
                    item: { id: item.id, name: item.name, price: item.price },
                  })
                }
                className="mt-auto self-start rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}