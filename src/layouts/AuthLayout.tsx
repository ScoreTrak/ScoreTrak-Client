import { MainNav } from "../components/MainNav";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
}
