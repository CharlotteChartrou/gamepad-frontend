import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Header from "./components/Header";
import Game from "./pages/Game";
import Login from "./components/Login";
import MyCollection from "./pages/MyCollection";
import Signup from "./components/Signup";
import Reviews from "./components/reviews";

function App() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      setToken(token);
    } else {
      Cookies.remove("token");
    }
    setToken(null);
  };

  return (
    <Router>
      <Header
        visble={visible}
        setVisible={setVisible}
        setVisible2={setVisible2}
        token={token}
        handleToken={handleToken}
      />
      {visible && (
        <Login
          setVisible={setVisible}
          setVisible2={setVisible2}
          handleToken={handleToken}
        />
      )}
      {visible2 && (
        <Signup
          setVisible={setVisible}
          setVisible2={setVisible2}
          handleToken={handleToken}
        />
      )}
      {reviews && <Reviews setReviews={setReviews} token={token} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/games/:id"
          element={
            <Game
              setReviews={setReviews}
              setVisible={setVisible}
              token={token}
            />
          }
        />
        <Route path="/mycollection" element={<MyCollection />} />
      </Routes>
    </Router>
  );
}

export default App;
