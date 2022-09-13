import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { RecipeListProvider } from "./components/provider/RecipeListContext";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <RecipeListProvider>
        <App />
      </RecipeListProvider>
    </Auth0Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
