import Sidebar from "../component/sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
export default Layout;
