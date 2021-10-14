import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/landing";

// pages
import Main from "./pages/main";
import Main2 from "./pages/main_2";
import Test from "./pages/test";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/">
          <Landing />
        </Route> */}
        <Route exact path="/">
          <Main2 />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
