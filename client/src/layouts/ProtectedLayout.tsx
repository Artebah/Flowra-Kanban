import { Outlet } from "react-router";
import Header from "./Header";

function ProtectedLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default ProtectedLayout;
