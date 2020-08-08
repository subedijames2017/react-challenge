import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";
import SearchPage from "./Components/SearchPage";

function App() {
  return (
    <Container>
      <SearchPage />
    </Container>
  );
}

export default App;
