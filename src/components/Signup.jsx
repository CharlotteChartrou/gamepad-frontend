import image from "../assets/image.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ setVisible2, setVisible, handleToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState({});

  const formData = new FormData();
  formData.append("files", file);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);

  return (
    <div className="container">
      <div className="modal-root">
        <div className="modal">
          <img
            onClick={() => {
              setVisible2(false);
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
                  {" "}
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
                  </svg>{" "}
                  Add a game to your collection
                </div>
                <div>
                  {" "}
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
              <h2>Signup</h2>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();

                  const formData = new FormData();
                  formData.append("avatar", file);
                  formData.append("username", username);
                  formData.append("password", password);
                  formData.append("email", email);

                  try {
                    if (password === confirmPassword) {
                      const response = await axios.post(
                        "http://localhost:3000/signup",
                        formData,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      );

                      console.log(response.data);
                      handleToken(response.data.token);
                      setVisible2(false);
                      navigate("/");
                    } else {
                      alert("password must be the same");
                    }
                  } catch (error) {
                    console.log(error.response);
                  }
                }}
              >
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <div style={{ display: "flex", gap: "3px" }}>
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </div>
                <input
                  type="file"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                />
                <button type="submit">Connexion</button>
              </form>
              <div
                onClick={() => {
                  setVisible2(false);
                  setVisible(true);
                }}
              >
                Already have an account ?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
