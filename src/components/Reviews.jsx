import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useState } from "react";

const Reviews = ({ setReviews, token }) => {
  const location = useLocation();
  /*   console.log("locaaaaatiiion", location); */
  const str = location.pathname;
  const game_id = str.slice(7);
  /*   console.log(game_id); */

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  /*  const {pathname} = location.state;
   */
  return (
    <div className="container">
      <div className="modal-root">
        <div className="modal">
          <div className="review">
            <div className="title-review">
              <div style={{ width: "200px", fontSize: "20px" }}>
                Write a review{" "}
              </div>
              <div
                onClick={() => {
                  setReviews(false);
                }}
              >
                X
              </div>
            </div>
            <div className="bloc-review">
              <form
                onSubmit={async (event) => {
                  /*     console.log(text, title); */
                  /*      let date = new Date(time);
                  console.log(date); */
                  event.preventDefault();
                  const thumbUp = 0;
                  const thumbDown = 0;
                  const score = 0;
                  const data = {
                    title,
                    text,
                    game_id,
                    thumbUp,
                    thumbDown,
                    score,
                  };
                  console.log(data);
                  const response = await axios.post(
                    `http://localhost:3000${location.pathname}/reviews`,
                    data,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  alert(response.data);
                  setReviews(false);
                  window.location.reload();
                }}
              >
                <h3> Review title</h3>
                <input
                  value={title}
                  type="text"
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <h3>Review text</h3>
                <input
                  value={text}
                  className="review-text"
                  type="text"
                  cols="30"
                  rows="10"
                  style={{ height: "100px" }}
                  onChange={(event) => {
                    setText(event.target.value);
                  }}
                />
                <button type="submit">Publish</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
