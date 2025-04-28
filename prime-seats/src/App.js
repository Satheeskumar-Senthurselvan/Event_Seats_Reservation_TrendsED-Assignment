import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import ProtectedRoute from './components/protectedRoute';
import NavBar from "./components/navBar";
import BottomBar from "./components/bottomBar";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import About from "./pages/about";
import EventDetail from "./pages/eventDetail";
import Products from "./pages/products";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
  const navigate = useNavigate();

  

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      {/* <Route path="/products/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <BottomBar />
  </>
  );
}

export default App;

