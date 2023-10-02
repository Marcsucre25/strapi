import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React, { Component } from "react";
import Login from "./components/Login/login";
import Logout from "./components/Logout/logout";
import Home from "./components/Home/home";
import Register from "./components/Registration/register";
import { ToastContainer } from "react-toastify";
import { Protector, userData } from "./helpers";
import CustonNav from "./components/CustomNav/custom";
import ProductView from "./ProductView/productView";
import Basket from "./components/basket/basket";
import useBasket from "./components/basket/useBasket";


function App() {

  
  const { jwt } = userData();
  const isLoogedIn = !!jwt;
  const {basket, addBasket, removeFromBasket, updateBasketItem} = useBasket(jwt);


  return (
    <React.Fragment>
      <Router>
        <CustonNav isLoogedIn={isLoogedIn} basketItems={basket.length}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/product-details/:id" element={<ProductView addBasket={addBasket} />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/basket" element={<Basket basket={basket} removeFromBasket={removeFromBasket} updateBasketItem={updateBasketItem}/>}></Route>
        </Routes>
        <ToastContainer />
      </Router>
    </React.Fragment>
  );
}

export default App;
