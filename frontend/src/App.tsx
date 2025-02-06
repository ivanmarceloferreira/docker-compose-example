import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
