import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import Recipe from "./pages/Recipe";

const App = () => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <GlobalStyles />
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
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default App;
