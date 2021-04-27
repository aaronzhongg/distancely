import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import Main from "./pages/main";
import Test from "./pages/test";

function App() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCcd8pNiudINQm6sve2Zd3F8mkNue54rbE&libraries=places&callback=initMap";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
