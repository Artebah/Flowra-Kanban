import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignupPage from "./pages/SignupPage";
import AuthGuard from "./hoc/AuthGuard";
import { routes } from "./constants/routes";
import { Toaster } from "react-hot-toast";
import ProtectedLayout from "./layouts/ProtectedLayout";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="bg-gray-eerie min-h-screen pb-4">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthGuard>
            <Routes>
              <Route element={<ProtectedLayout />}>
                <Route path={routes.home} element={<HomePage />} />
                <Route path={routes.boardById()} element={<BoardPage />} />
              </Route>

              <Route path={routes.login} element={<LoginPage />} />
              <Route path={routes.signup} element={<SignupPage />} />
              <Route path="*" element={<Navigate to={routes.login} />} />
            </Routes>
            <Toaster />
          </AuthGuard>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
