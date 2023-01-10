import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "./assets/styles/main.css";

import { Provider } from "react-redux";

import { AppFooter } from "./pages/app-footer";
import { AppHeader } from "./pages/app-header";
import { About } from "./views/about";
import { ToyIndex } from "./views/toy-index";
import { Home } from "./views/home";
import { ToyEdit } from "./views/toy-edit";
import { ToyDetails } from "./views/toy-details";
import { store } from "../src/store/store.js";
import { Dashboard} from './views/dashboard'
import { Login} from './views/login-page'
// import { Route, Router } from 'react-router-dom';

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<ToyIndex />} path="/toys" />
              <Route element={<About />} path="/about" />
              <Route element={<ToyDetails />} path="/toys/:toyId" />
              <Route element={<ToyEdit />} path="/toys/edit" />
              <Route element={<ToyEdit />} path="/toys/edit/:toyId" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Login />} path="/login" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  );
}
