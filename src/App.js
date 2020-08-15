import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Components
import SearchPage from "./components/SearchPage";
import Details from "./components/Details";

function App() {
  return (
    <Container>
      <Router>
        <Route exact path="/" component={SearchPage} />
        <Route
          path={"/:login/"}
          render={({ match, location }) => (
            <Details
              userName={match.params.login}
              repository={location.repository}
            />
          )}
        />
      </Router>
    </Container>
  );
}

export default App;
