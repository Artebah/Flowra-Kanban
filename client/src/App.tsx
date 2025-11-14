import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./layouts/Signup";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
