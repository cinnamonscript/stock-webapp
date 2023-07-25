import "./styles/App.css";
import React, { useState, useEffect } from "react";
import makeAnimated from "react-select/animated";
import {
  BrowserRouter as Router,
  Routes, // Note that Routes is replacing Switch as of v6
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/home.js";
import Stocks from "./pages/stocks.js";
import StocksInfo from "./pages/stockinfo.js";

const activeStyle = {
  fontWeight: "bold",
  color: "green",
  fontSize: "medium",
};

export default function App() {
  return (
    <Router>
      <div className="container">
        <div className="App">
          <ul class="menu d-flex justify-conten-center">
            <li class="menu-home">
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                HOME{" "}
              </NavLink>{" "}
            </li>

            <li class="menu-stocks">
              <NavLink
                to="/stocks"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                STOCKS{" "}
              </NavLink>{" "}
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/stocks/stocksinfo" element={<StocksInfo />} />
            <Route path="/stocks/stocksinfo/:symbol" element={<StocksInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
