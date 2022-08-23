import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import GlobalStyles from "./GlobalStyles";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Recipe from "./pages/Recipe";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/recipe/:id">
          <Recipe />
        </Route>
        <Route exact path="/blogs">
          <Blogs />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
