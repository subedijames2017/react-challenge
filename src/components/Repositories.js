import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
// get fontawesome imports
import { faStar, faEye, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Repositories({ repository, index }) {
  console.log("Repositories -> index", index);
  return (
    <div key={index} className="mt-1">
      <ListGroup>
        <ListGroup.Item variant="info">
          <Row>
            <Col xs={3}>Name: {repository.name}</Col>
            <Col xs={3}>Author: {repository.owner.login}</Col>
            <Col xs={2}>
              <FontAwesomeIcon icon={faStar} /> {repository.watchers_count}
            </Col>
            <Col xs={2}>
              <FontAwesomeIcon icon={faEye} /> {repository.watchers}
            </Col>
            <Col xs={2}>
              <FontAwesomeIcon icon={faCodeBranch} />
              {repository.forks}
            </Col>
          </Row>
          <Row className="mt-1">
            <Col>
              {repository.description}, updated: {repository.updated_at}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
