import { useCart } from "../cart/useCart";

export default function CartLines() {
  const { items, dispatch } = useCart();

  return (
    <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200">
      {items.map((item) => (
        <li key={item.id} className="flex flex-wrap items-center gap-3 px-3 py-3">
          <div className="min-w-32 flex-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Decrease quantity of ${item.name}`}
              onClick={() =>
                dispatch({ type: "DECREMENT", id: item.id })
              }
              className="h-8 w-8 rounded-md border border-slate-300 hover:bg-slate-50"
            >
              −
            </button>
            <span className="w-6 text-center">{item.quantity}</span>
            <button
              type="button"
              aria-label={`Increase quantity of ${item.name}`}
              onClick={() =>
                dispatch({ type: "INCREMENT", id: item.id })
              }
              className="h-8 w-8 rounded-md border border-slate-300 hover:bg-slate-50"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}