import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  // <>
  //   <Router>
  //     <Switch>
  //       <Route exact path="/" component={PokeList} />
  //       <Route exact path="/!#" component={PokeList} />
  //       {/* <Route path="/:postSlug" component={BlogPost} /> */}
  //     </Switch>
  //   </Router>
  // </>
);
