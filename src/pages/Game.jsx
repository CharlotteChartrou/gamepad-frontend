import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import img from "../assets/noimage.jpeg";
import { BallTriangle } from "react-loader-spinner";

const Game = ({ setReviews, setVisible, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [allReviews, setAllReviews] = useState([]);
  const [serie, setSerie] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(token);
  console.log(id);

  useEffect(() => {
    const fecthData = async () => {
      const reviews = `http://localhost:3000/games/${id}/reviews`;
      const games = `http://localhost:3000/games/${id}`;
      const gamesSeries = `http://localhost:3000/games/${id}/game-series`;

      const games_request = axios.get(games);
      const reviews_request = axios.get(reviews);
      const gamesSeries_request = axios.get(gamesSeries);

      await axios
        .all([games_request, reviews_request, gamesSeries_request])
        .then(
          axios.spread((...responses) => {
            const game = responses[0];
            const review = responses[1];
            const series = responses[2];
            setData(game.data);
            setSerie(series.data.results);
            /*             console.log(series.data.results); */
            /*   console.log(review.data); */
            const newTab = review.data;
            /*   console.log("t aabt", newTab) */
            setAllReviews([newTab]);
            setIsLoading(false);
          })
        );

      /*       console.log(response.data); */

      /*     console.log(data.id) */
    };
    fecthData();
  }, []);

  return (
    <>
      {isLoading ? (
        <BallTriangle
          height={150}
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
          <h2>{data.name}</h2>
          <div className="game-display">
            <div className="game-div">
              {data.background_image === null ? (
                <img src={img} />
              ) : (
                <img src={data.background_image} alt="game-photo" />
              )}
            </div>
            <div className="game-div">
              <div className="buttons">
                <button
                  type="submit"
                  className="game-button"
                  onClick={async () => {
                    const gameId = data.id;
                    const gameImage = data.background_image;
                    const gameName = data.name;
                    const dataFav = { gameId, gameImage, gameName };
                    /*                     console.log(dataFav);
                    console.log("tokennn", token); */
                    try {
                      const response = await axios.post(
                        `http://localhost:3000/favorites/${token}`,
                        dataFav,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      alert(response.data);
                    } catch (error) {
                      console.log(error.response);
                    }
                  }}
                >
                  Save to <span style={{ color: "#74D963" }}>Collection</span>
                  {"  "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
                <button
                  className="game-button"
                  onClick={() => {
                    token
                      ? (setReviews(true), { state: { Game_id: id } })
                      : setVisible(true);
                  }}
                >
                  Add a Review{"    "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
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
                </button>
              </div>
              <div className="game-description">
                <div>
                  <h3>Plateforms</h3>
                  <div>
                    {data.platforms.map((platform, index) => {
                      /*    console.log(platform.platform); */

                      return (
                        <span key={platform.platform.id}>
                          {platform.platform.name},{" "}
                        </span>
                      );
                    })}
                  </div>
                  <h3>Realeased date</h3>
                  <div>{data.released}</div>
                  <h3>Publisher</h3>
                  <div>
                    {data.publishers.map((publisher, index) => {
                      return <div key={publisher.id}>{publisher.name}</div>;
                    })}
                  </div>
                </div>
                <div>
                  <h3>Genre</h3>
                  <div>
                    {data.genres.map((genre, index) => {
                      return <div key={genre.id}>{genre.name}</div>;
                    })}
                  </div>
                  <h3>Developer</h3>
                  <div>
                    {data.developers.map((developer, index) => {
                      /*         console.log(developer); */
                      return <span key={developer.id}>{developer.name}, </span>;
                    })}
                  </div>
                  <h3>Age rating</h3>
                  {data.esrb_rating === null ? (
                    <div>not defined</div>
                  ) : (
                    <div>{data.esrb_rating.name}</div>
                  )}
                </div>
              </div>
              <div className="about">
                <h3>About</h3>
                <p style={{ maxLines: "5" }}>{data.description_raw}</p>
              </div>
            </div>
          </div>
          <h2>Games like {data.name} </h2>
          <div
            style={{
              display: "flex",
              overflow: "scroll",
              gap: "15px",
              margin: "65px",
            }}
          >
            {serie.map((serie, index) => {
              return (
                <div
                  key={serie.id}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <img
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    src={serie.background_image}
                    alt="game-pic"
                  />

                  <h4
                    style={{
                      width: "200px",
                    }}
                  >
                    {serie.name}
                  </h4>
                </div>
              );
            })}
          </div>
          <div className="reviews">
            {allReviews.map((review, index) => {
              console.log(review.length);
              return (
                <>
                  <div></div>
                  <h2>
                    Reviews{" "}
                    <span
                      style={{
                        fontSize: "10px",
                        position: "relative",
                        bottom: "14px",
                      }}
                    >
                      {review.length}
                    </span>
                  </h2>
                  <div key={index}>
                    {review.length === 0 ? (
                      <div key="0"> No review for this game ! </div>
                    ) : (
                      <div key={index} className="review-section">
                        <div className="review-title">Most relevant review</div>
                        {review.map((rev, index) => {
                          /*  console.log(rev); */
                          return (
                            <div className="border-review">
                              <div key={rev._id} className="bloc-reviews">
                                <div>
                                  <h5> {rev.title}</h5>
                                  <div> {rev.text}</div>{" "}
                                </div>
                                <div className="reviews-row2">
                                  <div className="review-user">
                                    <img
                                      style={{
                                        width: "70px",
                                        height: "70px",
                                        objectFit: "cover",
                                        borderRadius: "50px",
                                      }}
                                      src={rev.owner.avatar}
                                    />
                                    <div>{rev.owner.username}</div>{" "}
                                  </div>
                                  <div className="thumb-butt">
                                    <div
                                      style={{
                                        color: "#FF4655",
                                        fontSize: "13px",
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#FF4655"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        onClick={async () => {
                                          const thumbUpdate = "down";
                                          console.log(thumbUpdate);
                                          const revId = rev._id;
                                          console.log(revId);
                                          const data = { thumbUpdate, revId };
                                          console.log(data);

                                          try {
                                            const update = await axios.put(
                                              `http://localhost:3000/games/${id}/reviews`,
                                              data,

                                              {
                                                headers: {
                                                  Authorization: `Bearer ${token}`,
                                                },
                                              }
                                            );
                                            console.log(response.data);
                                            window.location.reload();
                                          } catch (error) {
                                            console.log(error.response);
                                          }
                                        }}
                                      >
                                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                                      </svg>
                                      {rev.thumbDown}
                                    </div>
                                    <div
                                      style={{
                                        color: "#74D963",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {" "}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#74D963"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        onClick={async () => {
                                          const thumbUpdate = "up";
                                          console.log(thumbUpdate);
                                          const revId = rev._id;
                                          console.log(revId);
                                          const data = { thumbUpdate, revId };
                                          console.log(data);

                                          try {
                                            const update = await axios.put(
                                              `http://localhost:3000/games/${id}/reviews`,
                                              data,

                                              {
                                                headers: {
                                                  Authorization: `Bearer ${token}`,
                                                },
                                              }
                                            );
                                            console.log(response.data);
                                            window.location.reload();
                                            navigate(`/games/${id}`);
                                          } catch (error) {
                                            console.log(error.response);
                                          }
                                        }}
                                      >
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                      </svg>
                                      {rev.thumbUp}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}{" "}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
