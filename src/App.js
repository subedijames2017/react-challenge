import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import SearchPage from "./components/SearchPage";
import Details from "./components/Details";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Router>
          <Route exact path="/" component={SearchPage} />
          <Route
            path={"/:login/"}
            render={({ match, location, history }) => (
              <Details
                login={match.params.login}
                repository={location.repository}
                history={history}
              />
            )}
          />
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
