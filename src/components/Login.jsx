import image from "../assets/image.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setVisible, handleToken, setVisible2 }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <div className="modal-root">
        <div className="modal">
          <img
            onClick={() => {
              setVisible(false);
            }}
            src={image}
          />
          <div className="modal-column">
            <div className="column-1">
              <h2>How it works ?</h2>
              <div className="column-description">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>{" "}
                  Log in to your free account to be able to get all features of
                  Gamepad
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Add a game to your collection
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                  </svg>
                  Leave a review for a game{" "}
                </div>
              </div>
            </div>
            <div className="column-2">
              <h2>Login</h2>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  try {
                    const response = await axios.post(
                      "http://localhost:3000/login",
                      {
                        email,
                        password,
                      }
                    );
                    console.log(response.data);
                    handleToken(response.data.token);
                    console.log(response.data.token);
                    setVisible(false);
                  } catch (error) {
                    console.log(error.response.data);
                  }
                }}
              >
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  placeholder="Password"
                />
                <button type="submit"> Connexion </button>
              </form>
              <div
                onClick={() => {
                  setVisible(false);
                  setVisible2(true);
                }}
              >
                Don't have an account yet ?{" "}
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Login;
