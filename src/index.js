import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/Layout";
import AuthProvider from "./contexts/AuthContext";
import Provider from "./contexts/FirestoreContext";

import "./index.css";
import AppRoutes from "./components/AppRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
