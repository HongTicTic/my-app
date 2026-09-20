import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import TodoApp from "./components/ToDoApp";
import UserDirectory from "./pages/UserDirectory";
import UserDetail from "./pages/UserDetail";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/todos" replace />} />
        <Route path="/todos" element={<TodoApp />} />
        <Route path="/users" element={<UserDirectory />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}