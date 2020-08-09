import React, { useState, useEffect } from "react";
import { getUser } from "../services/index";

function Details({ login, repository, history }) {
  if (!repository) {
    history.push("/");
  }
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState({});
  useEffect(() => {
    getUser(login)
      .then((resp) => {
        if (resp && resp.data) {
          setUser(resp.data);
        }
      })
      .catch((err) => {
        console.log("Details -> err", err);
      });
  });
  return (
    <div>
      <p>Hello this should work {user.name}</p>
    </div>
  );
}
export default Details;
