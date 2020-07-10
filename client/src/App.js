import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Join from "./components/Join";
import Join from "./components/Join";
function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
