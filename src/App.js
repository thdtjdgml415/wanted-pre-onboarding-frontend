import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Join from "./components/pages/Join";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/signin" element={<Join />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
