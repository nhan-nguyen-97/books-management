import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";
import Authors from "./pages/authors";
import Books from "./pages/books";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginPage from "./pages/login";
import Users from "./pages/users";
import Profile from "./pages/profile";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/authors" element={<Authors />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <ToastContainer autoClose={2000} />
    </Fragment>
  );
}

export default App;
