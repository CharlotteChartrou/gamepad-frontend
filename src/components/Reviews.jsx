import axios from "axios";
import image from "../assets/image.png"

const Reviews =({setReviews}) => {
    return (<div className="container">
    <div className="modal-root">
        <div className="modal">
       
        <div className="review">     
        <div className="title-review">
        <h2> Write a review </h2>
        <div onClick={()=> {setReviews(false)}}  > X </div>
        </div>
        <div className="bloc-review">
            <form>
<h3> Review title</h3>
<input type="text-area" />
<h3>Review text</h3>
<input className="review-text" type="text-area" style={{height:"100px"}} />
<button type="submit">Publish</button></form></div></div>
            </div>
            </div>
            </div>)
}

export default Reviews;