import { HashRouter as Router, Switch, Route } from "react-router-dom"; // todo: BrowserRouter

// pages
import Distance from "./pages/distance";
import Test from "./pages/test";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Distance />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
