import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from "./components/Home";
import Login from './components/Login';
import Register from './components/RegisterUser';
import CategoryResults from "./components/CategoryResults";
import SelectedItem from "./components/SelectedItem";
import ShoppingCart from "./components/ShoppingCart"

function App() {
  return (
    <div className="App">
    
    <Router>
    <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/womensclothing" element={<CategoryResults />} />
          <Route path="/mensclothing" element={<CategoryResults />} />
          <Route path="/sale" element={<CategoryResults />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/selecteditem" element={<SelectedItem />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
