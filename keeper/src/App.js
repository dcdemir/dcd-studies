import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Keeper from './keeper';
import Header from './header';
import Footer from './footer';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const indexPage = createBrowserRouter([
    {
      path: "/",
      element: <Keeper></Keeper>
    },
  ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <Header/>
        <RouterProvider router={indexPage} />
        <Footer/>
      </React.StrictMode>
  );


}

export default App;
