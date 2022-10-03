import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {HelmetProvider} from 'react-helmet-async';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <BrowserRouter>
    <HelmetProvider>
      <App />
      </HelmetProvider>
    </BrowserRouter>,
);
