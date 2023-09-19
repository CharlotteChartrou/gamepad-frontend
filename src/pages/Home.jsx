import axios from "axios";
import { useState, useEffect } from "react";
import logo from "../assets/biglogo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [page, setPage] = useState("1");

  useEffect(() => {
    const fecthData = async () => {
      const response = await axios.get(
        `http://localhost:3000/games?search=${search}&ordering=${ordering}&page=${page}`
      );

      setData(response.data);
      /*   console.log(response.data);  */

      setIsLoading(false);
    };
    fecthData();
  }, [search, ordering, page]);
  /*       console.log(data); */

  return (
    <>
      {isLoading ? (
        <span>Chargement...</span>
      ) : (
        <div className="container">
          <div className="search-container">
            <img src={logo} alt="logo" />
            <div className="input-search">
              <input
                type="search"
                placeholder="Search for a game"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#171719"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            {search === "" ? (
              <div>Search {data.count} games</div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div>Search result for "{search}"</div>{" "}
                <div>{data.count} games</div>
              </div>
            )}
          </div>
          <div className="filter">
            <h4 style={{ backgroundColor: "red", padding: "5px" }}>
              FILTERS BY
            </h4>
            <div
              onClick={() => {
                setOrdering("-released");
              }}
            >
              {" "}
              relased date
            </div>
            <div
              onClick={() => {
                setOrdering("-name");
              }}
            >
              name
            </div>
            <div
              onClick={() => {
                setOrdering("-rating");
              }}
            >
              rating
            </div>
            <div
              onClick={() => {
                setOrdering("-created");
              }}
            >
              date of creation
            </div>
            <div
              onClick={() => {
                setOrdering("");
              }}
            >
              reset filters
            </div>
          </div>

          {search === "" && ordering === "" && <h2>Most Relevance Games</h2>}
          <div className="card">
            {data.results.map((games, index) => {
              /*     console.log(games.platforms) */
              /*     console.log(games) */
              return (
                <div
                  className="game"
                  key={games.id}
                  onClick={() =>
                    navigate(`/games/${games.id}`, setOrdering(""))
                  }
                >
                  <div key={games.id}>{games.name}</div>
                  <img src={games.background_image} alt="games_photo" />
                </div>
              );
            })}
          </div>
          <div className="pagination">
            {page === 1 ? (
              <button disabled>
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
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            ) : (
              <button onClick={() => setPage(Number(page) - 1)}>
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
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
            <span className="page-display"> {page}</span>
            <span>{Number(page) + 1}</span>
            {page === null ? (
              <button disable>
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
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => {
                  setPage(Number(page) + 1);
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
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
