import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyCollection = ({ token }) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthData = async () => {
      const response = await axios.get(
        `http://localhost:3000/favorites/${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
      console.log(response.data);

      setIsLoading(false);
    };
    fecthData();
  }, []);

  return (
    <>
      {isLoading ? (
        <BallTriangle
          height={100}
          width="100%"
          radius={5}
          color="#FF4655"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      ) : (
        <div className="container">
          <h2 style={{ width: "100%", marginLeft: "40px" }}>My Collection</h2>
          <div className="card">
            {data.map((fav, index) => {
              return (
                <div key={fav._id} className="game">
                  <svg
                    className="save"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill=" #FF4655"
                    stroke=" #FF4655"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    onClick={async () => {
                      const gameId = fav._id;

                      try {
                        const response = await axios.delete(
                          `http://localhost:3000/favorites/${token}/${gameId}`,

                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        alert(response.data);
                        window.location.reload();
                      } catch (error) {
                        console.log(error.response);
                      }
                    }}
                  >
                    <ToastContainer />
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <div>{fav.gameName}</div>
                  <img src={fav.gameImage} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MyCollection;
