import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import Main from "./pages/main";
import Test from "./pages/test";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
