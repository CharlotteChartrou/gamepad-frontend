
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Header = ({visible, setVisible, token, handleToken, setVisible2}) => {
const navigate = useNavigate();
    return (<>
    <header className="container">
        <nav>
    <img onClick={() => {navigate("/"), setVisible(false), setVisible2(false)}} src={logo} alt="logo" />
    <div> 
        <button onClick={()=> {token ? (navigate("/mycollection")) : (setVisible(!visible)) }} style={{color: "white", textDecoration:"none", backgroundColor:"black"}}>My Collection</button>
        {token ? (<button onClick={()=> {handleToken(null)}}>log out</button>) : (<button  onClick={() => { setVisible(!visible)}}
        style={{color: "white", textDecoration:"none", backgroundColor: "#FF4655", borderRadius:"3px" }}>Login</button>) }
    </div>
    </nav>
    </header>
    </>)
}

export default Header;