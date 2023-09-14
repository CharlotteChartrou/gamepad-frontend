import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Game = ({setReviews, setVisible, token}) => {
        const [data, setData] = useState();
        const [isLoading, setIsLoading] = useState(true);
        const { id } = useParams();
        const navigate = useNavigate();
/*            console.log(id);     */    
        useEffect(() => {
          const fecthData = async () => {
            const response = await axios.get(
              `http://localhost:3000/games/${id}`
            );
/*       console.log(response.data); */
            setData(response.data);
            setIsLoading(false);
        /*     console.log(data.id) */
          };
          fecthData();
        }, []);

     

        return (
          <>
            {isLoading ? (
              <span>Chargement...</span>
            ) : ( <div className="container">

  <h2>{data.name}</h2>
<img style={{width:"400px"}} src={data.background_image} alt="game-photo" />


<div>Save to <span style={{color:"green"}}>Collection</span> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> </div>


<div   onClick={() =>{ token ? (setReviews(true )) : (setVisible(true))}}  >Add a Review <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg></div>
<h3>Plateforms</h3>
<div>
{data.platforms.map((platform, index)=>{
     /*    console.log(platform.platform); */
        return (<div key={platform.platform.id}>{platform.platform.name}</div>)
})}
    </div>
<h3>Realeased date</h3>
<div>{data.released}</div>
<h3>Publisher</h3>
<div>
    {data.publishers.map((publisher, index)=>{
      
        return (<div key={publisher.id}>{publisher.name}</div>)
})}</div>

<h3>Genre</h3>
<div>
    {data.genres.map((genre, index)=>{
        return (<div key={genre.id}>{genre.name}</div>)
})}
</div>
<h3>Developer</h3>
<div>
    {data.developers.map((developer, index)=>{
/*         console.log(developer); */
        return (<div key={developer.id}>{developer.name}</div>)
})}</div>
<h3>Age rating</h3>
<div>{data.esrb_rating.name}</div>
<h3>About</h3>
<div>{data.description_raw}</div> 
<h2>Games like {data.name} </h2>

            </div>)}
    </>)
}

export default Game;