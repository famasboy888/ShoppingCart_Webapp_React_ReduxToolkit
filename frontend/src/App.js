//CSS
import "./App.css";
import "react-toastify/ReactToastify.min.css";

//Imports
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NotFound from "./components/NotFound..";

//Toast
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer limit={3} />
        <NavBar />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
