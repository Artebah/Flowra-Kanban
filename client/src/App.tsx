import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Login from "./layouts/Login/Login";

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
