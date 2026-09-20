import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div className="mx-auto min-h-screen max-w-3xl p-6">
      <NavBar />
      <Outlet />
    </div>
  );
}