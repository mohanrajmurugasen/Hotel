import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { homeProduct } from "./Redux/Action/Action";

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(
        homeProduct(JSON.parse(JSON.stringify(localStorage.getItem("user"))))
      );
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
