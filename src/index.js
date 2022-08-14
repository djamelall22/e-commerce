import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// domain: djamel-eddine.eu.auth0.com
// client id; ZbT5i8MiUiUzI114xCgd5jMutkRCeXyk
// personal project don't care about security

root.render(
  <Auth0Provider
    domain="djamel-eddine.eu.auth0.com"
    clientId="ZbT5i8MiUiUzI114xCgd5jMutkRCeXyk"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
