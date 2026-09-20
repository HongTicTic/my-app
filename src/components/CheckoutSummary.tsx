import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useCart } from "../cart/useCart";

// No props: reads cart and auth from context
export default function CheckoutSummary() {
  const { items, totalQuantity, subtotal } = useCart();
  const { user } = useAuth();

  return (
    <aside className="mt-6 rounded-lg border border-slate-200 p-4">
      <h2 className="mb-2 text-lg! font-semibold">Checkout summary</h2>
      <dl className="grid grid-cols-[1fr_auto] gap-y-1 text-sm">
        <dt className="text-slate-500">Lines</dt>
        <dd>{items.length}</dd>
        <dt className="text-slate-500">Items</dt>
        <dd>{totalQuantity}</dd>
        <dt className="font-medium">Subtotal</dt>
        <dd className="font-medium">${subtotal.toFixed(2)}</dd>
      </dl>
      <p className="mt-3 text-sm text-slate-600">
        {user ? (
          `Checking out as ${user.email}.`
        ) : (
          <>
            <Link to="/signin" className="underline">
              Sign in
            </Link>{" "}
            to check out.
          </>
        )}
      </p>
    </aside>
  );
}