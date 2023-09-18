import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


import { useState } from "react";

const Reviews =({setReviews, token}) => {
    const location = useLocation();
    console.log("locaaaaatiiion", location) 
const str = location.pathname;
    const game_id = str.slice(7);
    console.log(game_id)
  /*  */ /*  const id = location.pathname; */
 /*    console.log(id); */


    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
   /*  const {pathname} = location.state;
 */
    return (<div className="container">
    <div className="modal-root">
        <div className="modal">
       
        <div className="review">     
        <div className="title-review">
        <h2> Write a review </h2>
        <div onClick={()=> {setReviews(false)}}  > X </div>
        </div>
        <div className="bloc-review">
            <form onSubmit= { async (event)=> {
                console.log(text, title);
                event.preventDefault();
const data = {title, text, game_id};
console.log(data);
                const response = await axios.post(`http://localhost:3000${location.pathname}/reviews`,
                data,
                {
                    headers: {
                      'Authorization': `Bearer ${token}`, 
                   
                    }}
                )
                console.log(response.data);
                setReviews(false);
            }}>
<h3> Review title</h3>
<input value={title} type="text" onChange={(event)=> { setTitle(event.target.value)}} />
<h3>Review text</h3>
<input value={text} className="review-text" type="text" style={{height:"100px"}} onChange={(event)=> { setText(event.target.value)}} />
<button type="submit">Publish</button></form></div></div>
            </div>
            </div>
            </div>)
}

export default Reviews;