import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import user from "../assets/user.webp";

const Header = ({ visible, setVisible, token, handleToken, setVisible2 }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  console.log(token);

  useEffect(() => {
    const fecthData = async () => {
      const response = await axios.get(`http://localhost:3000/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    if (token) {
      fecthData();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <header className="container">
          <nav>
            <div>
              <img
                onClick={() => {
                  navigate("/"), setVisible(false), setVisible2(false);
                }}
                src={logo}
                alt="logo"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div
                onClick={() => {
                  token ? navigate("/mycollection") : setVisible(!visible);
                }}
              >
                My Collection
              </div>
              {token === null && (
                <button
                  onClick={() => {
                    setVisible(!visible);
                  }}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    backgroundColor: "#FF4655",
                    borderRadius: "3px",
                    marginTop: "10px",
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        </header>
      ) : (
        <>
          <header className="container">
            <nav>
              <div>
                <img
                  onClick={() => {
                    navigate("/"), setVisible(false), setVisible2(false);
                  }}
                  src={logo}
                  alt="logo"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  onClick={() => {
                    token ? navigate("/mycollection") : setVisible(!visible);
                  }}
                >
                  My Collection
                </div>
                {token ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    {data.avatar ? (
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50px",
                        }}
                        src={data.avatar.secure_url}
                      />
                    ) : (
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50px",
                        }}
                        src={user}
                        alt="my avatar"
                      />
                    )}
                    <span>{data.username}</span>
                    <span
                      onClick={() => {
                        handleToken(null);
                      }}
                    >
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
                        <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setVisible(!visible);
                    }}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      backgroundColor: "#FF4655",
                      borderRadius: "3px",
                      marginTop: "10px",
                    }}
                  >
                    Login
                  </button>
                )}
              </div>
            </nav>
          </header>
        </>
      )}
    </>
  );
};

export default Header;
