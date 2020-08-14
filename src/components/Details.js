import React, { useEffect, useState } from "react";
import { getUser, getReadme } from "../services/index";
import { Spinner, Container, Col, Image, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Details(props) {
  let repository = props.history.location.repository;
  let userName = props.login;
  // Rendering user to search page if no reposetory information passed
  if (!repository) {
    props.history.push("/");
  }
  // Compining releted information to avoid multiple rendering
  const [userInformation, settUserInformation] = useState({
    loading: false,
    user: null,
  });
  const [readme, setReadme] = useState("");
  const { loading, user } = userInformation;

  useEffect(() => {
    settUserInformation({
      ...userInformation,
      loading: true,
    });
    // Get user information for full name
    getUser(userName)
      .then((userResp) => {
        if (userResp.data) {
          settUserInformation({
            loading: false,
            user: userResp.data,
          });
          // Get readme content
          getReadme(userName, repository.name)
            .then((repositoryResponse) => {
              if (repositoryResponse.data) {
                setReadme(repositoryResponse.data);
              }
            })
            .catch((repositoryError) => {
            });
        }
      })
      .catch((err) => {
        console.log("Details -> err", err);
      });
    // Clear user after unmount
    return () => {
      settUserInformation({
        loading: false,
        user: null,
      });
    };
  }, []);
  let displayContent = [];
  // Checking repositoryCount and pagination limit to display load more button
  if (loading || !user) {
    displayContent = [
      <Spinner
        animation="grow"
        variant="danger"
        className="loader"
        aria-hidden="true"
      />,
    ];
  }
  if (user && repository) {
    displayContent = [
      <Container>
        <Row>
          <Link to="/" className="text-info">
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className="back"
              size="2x"
            />
          </Link>
        </Row>
        <Row>
          <Col xs={3}>
            <Image
              src={user.avatar_url}
              roundedCircle
              height="200"
              width="200"
              className="avatar"
            />
          </Col>
          <Col xs={9}>
            <a href={user.html_url} target="_blank" className="link-tag">
              <h4 className="mt-3">
                Name: {user.name ? user.name : user.login}
              </h4>
            </a>
            <a href={repository.html_url} target="_blank" className="link-tag">
              <h4 className="mt-3">Repository: {repository.name}</h4>
            </a>
            <h4 className="mt-3">Open issues: {repository.open_issues}</h4>
            <h4 className="mt-3">
              Default branch: {repository.default_branch}
            </h4>
          </Col>
        </Row>
        {readme && (
          <div className="readme">
            <Row className="mt-4">
              <h2 className="text-center">README.md</h2>
            </Row>
            <Row className="mt-4">
              <ReactMarkdown source={atob(readme.content)} escapeHtml={false} />
            </Row>
          </div>
        )}
      </Container>,
    ];
  }
  return <div>{displayContent}</div>;
}
// Using react memo to avoid multiple render
export default React.memo(Details);
