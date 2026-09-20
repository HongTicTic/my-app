import { Link } from "react-router-dom";
import { useCart } from "../cart/useCart";
import CartLines from "../components/CartLines";
import CheckoutSummary from "../components/CheckoutSummary";

export default function CartPage() {
  const { items } = useCart();

  return (
    <section>
      <h1 className="mb-4 text-3xl! font-semibold">Cart</h1>
      {items.length === 0 ? (
        <p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          Your cart is empty.{" "}
          <Link to="/shop" className="underline">
            Browse the shop
          </Link>
        </p>
      ) : (
        <>
          <CartLines />
          <CheckoutSummary />
        </>
      )}
    </section>
  );
}