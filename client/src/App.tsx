import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./layouts/Signup";
import AuthGuard from "./hoc/AuthGuard";
import { routes } from "./constants/routes";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthGuard>
          <Routes>
            <Route
              path={routes.dashboard}
              element={
                <>
                  <Header />
                  <Main />
                </>
              }
            />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.signup} element={<Signup />} />
            <Route path="*" element={<Navigate to={routes.login} />} />
          </Routes>
          <Toaster />
        </AuthGuard>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
