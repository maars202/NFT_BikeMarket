import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import { Provider } from 'react-redux';

// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  // About,
  // Contact,
  Blog,
  Posts,
  Post,
  CardFlip
} from "./components";

ReactDOM.render(
  <Provider store={store}>
  <Router>
    {/* <Navigation /> */}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<CardFlip />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":tokenid" element={<CardFlip />} />
      </Route>
    </Routes>
    {/* <Footer /> */}
  </Router>
  </Provider>,

  document.getElementById("root")
);




// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
