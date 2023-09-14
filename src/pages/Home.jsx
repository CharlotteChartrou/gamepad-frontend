import axios from "axios";
import { useState, useEffect } from "react";
import logo from "../assets/biglogo.png"
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [search, setSearch]= useState("");
    useEffect(() => {
      
        const fecthData = async () => {
          const response = await axios.get(
            `http://localhost:3000/games?search=${search}`
          );
    
          setData(response.data);
/*         console.log(response.data); */
    
          setIsLoading(false);
        };
        fecthData();
      }, [search]);
/*       console.log(data); */
    
      
    
      return (
        <>
          {isLoading ? (
            <span>Chargement...</span>
          ) : (<div className="container">
            <div className="search-container">
             
            <img src={logo} alt="logo" />
            <div className="input-search">
            <input type="search" placeholder="Search for a game" value={search} onChange = {(event) => {
                setSearch(event.target.value)
             } } /> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#171719" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
</div>
             <div>Search {data.count} games</div>

  </div>   
  <h2>Most Relevance Games</h2>
  <div className="card"> 
 
          {data.results.map((games, index) => {
        /*     console.log(games) */
            return (<div className="game" key={games.id} onClick={() => navigate(`/games/${games.id}`)} >
                <div key={games.id}>{games.name}</div>
            <img src={games.background_image} alt="games_photo" /></div>)
          })}</div></div>) 
}</>)
};

export default Home;