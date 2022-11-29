import React from "react";
import ReactDOM from "react-dom/client";
import "../src/style.css";
import App from "./App";
import { SearchConsumer } from "./context/SearchContext";
import { UserConsumer } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserConsumer>
    <SearchConsumer>
      <App />
    </SearchConsumer>
  </UserConsumer>
);
