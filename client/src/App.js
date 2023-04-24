import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import PrivatedRoutes from "./Components/ProtectedRoute";
import Layout from "./Components/Layout";


function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PrivatedRoutes />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
