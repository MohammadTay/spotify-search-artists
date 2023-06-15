import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

var client_id = "fe00d689751f4111839197e8efb00027";

var redirect_uri = "http://localhost:3000/artist";

// var state = generateRandomString(16);
var state = Math.random(16).toString();

localStorage.setItem("stateKey", state);
var scope = "user-read-private user-read-email";

var url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(client_id);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
url += "&state=" + encodeURIComponent(state);
export const Login = () => {
  const handleClick = () => {
    window.location = `${url}`;
  };

  return (
    <div className="login-container">
      <Link className="spotifyLink" onClick={handleClick}>
        <button className="login-button">
          <p className="login-text"> login</p>
          <img className="spotifyImg" src="/img/spotify.jpg" alt="" />
        </button>
      </Link>
    </div>
  );
};
