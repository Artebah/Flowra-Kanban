import { Outlet } from "react-router";
import Header from "./Header";

function ProtectedLayout() {
  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto mt-7">
        <Outlet />
      </main>
    </>
  );
}

export default ProtectedLayout;
