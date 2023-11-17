import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./screens/Cart";
import Home from "./screens/Home";
import store from "./store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
