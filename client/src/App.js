import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import GlobalStyles from "./GlobalStyles";
import Home from "./pages/Home/Home";
import Facts from "./pages/Facts/Facts";
import LandingPage from "./pages/LandingPage/LandingPage";
import Places from "./pages/Places/Places";
import Profile from "./pages/Profile/Profile";
import Recipe from "./pages/Recipe/Recipe";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/recipes">
          <Home />
        </Route>
        <Route exact path="/recipe/:id">
          <Recipe />
        </Route>
        <Route exact path="/places">
          <Places />
        </Route>
        <Route exact path="/facts">
          <Facts />
        </Route>
        <Route exact path="/profile/:id">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
