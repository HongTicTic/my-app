import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useCart } from "../cart/useCart";
// import WindowWidth from "./WindowWidth";

function linkClass({ isActive }: { isActive: boolean }): string {
  return isActive
    ? "rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white"
    : "rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100";
}

export default function NavBar() {
  const { user } = useAuth();
  const { totalQuantity } = useCart();

  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
      <NavLink to="/todos" className={linkClass}>
        Todos
      </NavLink>
      <NavLink to="/users" end className={linkClass}>
        Users
      </NavLink>
      <NavLink to="/shop" className={linkClass}>
        Shop
      </NavLink>
      <NavLink to="/cart" className={linkClass}>
        Cart
        {totalQuantity > 0 && (
          <span className="ml-1.5 rounded-full bg-red-100 px-1.5 text-xs text-red-700">
            {totalQuantity}
          </span>
        )}
      </NavLink>

      <div className="ml-auto flex items-center gap-3">
        {/* <WindowWidth /> */}
        {user ? (
          <>
            <span className="text-sm">Hi, {user.email}</span>
            <Link
              to="/signout"
              className="rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
            >
              Sign out
            </Link>
          </>
        ) : (
          <Link
            to="/signin"
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}