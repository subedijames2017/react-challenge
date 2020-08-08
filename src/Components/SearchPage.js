import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { ReactComponent as GithubLogo } from "../github.svg";

class SearchPage extends Component {
  render() {
    return (
      <div>
        <GithubLogo className="banner-logo" />
        <h3 className="text-center text-info mt-3">Repository Finder</h3>
        <Form>
          <Row>
            <Col xs={8}>
              <Form.Group controlId="searchRepositry">
                <Form.Control
                  type="text"
                  placeholder="Search for repository"
                  required
                  className="mt-4"
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Button className="search mt-4" type="submit" variant="info">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default SearchPage;
