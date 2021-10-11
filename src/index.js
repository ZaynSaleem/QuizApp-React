import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
// import Subcategory from "./pages/Admin/subcategory";
import Subcategory from "./pages/Admin/subCat";
import Question from "./pages/Admin/question";


ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,

  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/quiz-subcategory">
        <Subcategory />
      </Route>
      <Route path="/add-question">
        <Question />
      </Route>
    </Switch>
  </Router>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
