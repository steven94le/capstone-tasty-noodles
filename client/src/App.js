import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "./pages/Home";
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
        </Switch>
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default App;
