import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./layouts/Signup";
import AuthGuard from "./hoc/AuthGuard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthGuard>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <>
                  <Header />
                  <Main />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
