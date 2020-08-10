import React, { useEffect } from "react";
import { getUser, getReadme } from "../services/index";
import { useSelector, useDispatch } from "react-redux";
import {
  Spinner,
  Container,
  Col,
  Image,
  Row,
  ListGroup,
  Button,
} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Details(props) {
  let repository = props.history.location.repository;
  let login = props.login;
  if (!repository) {
    props.history.push("/");
  }
  const user = useSelector((state) => state.userState.user);
  const loading = useSelector((state) => state.userState.loading);
  const readme = useSelector((state) => state.userState.readme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "USER_LOADING", payload: { loading: true } });
    getUser(login)
      .then((userResp) => {
        if (userResp && userResp.data) {
          let newChange = {
            user: userResp.data,
            loading: false,
            readme: null,
          };
          getReadme(repository.owner.login, repository.name)
            .then((repositoryResponse) => {
              if (repositoryResponse.data) {
                newChange["readme"] = repositoryResponse.data;
              }
              dispatch({ type: "FETCH_USER", payload: newChange });
            })
            .catch((repositoryError) => {
              dispatch({ type: "FETCH_USER", payload: newChange });
            });
        }
      })
      .catch((err) => {
        console.log("Details -> err", err);
      });
    // Clear user after unmount
    return () => {
      let newChange = {
        user: null,
        loading: false,
        readme: null,
      };
      dispatch({ type: "FETCH_USER", payload: newChange });
    };
  }, []);
  let displayContent = [];
  // Checking repositoryCount and pagination limit to display load more button
  if (loading || !user) {
    displayContent.push(
      <Spinner
        animation="grow"
        variant="danger"
        className="loader"
        aria-hidden="true"
      />
    );
  }
  if (user) {
    displayContent.push(
      <Container>
        <Row>
          <Link to="/" className="text-info">
            <FontAwesomeIcon
              icon={faLongArrowAltLeft}
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
      </Container>
    );
  }
  return <div>{displayContent}</div>;
}
export default React.memo(Details);
