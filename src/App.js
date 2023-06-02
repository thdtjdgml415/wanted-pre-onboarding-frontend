import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Header from "./components/layout/Header";
import Todo from "./components/pages/Todo";
import Login from "./components/pages/Login";
import Join from "./components/pages/Join";
import Main from "./components/pages/Main";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Todo" element={<Todo />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Join />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
