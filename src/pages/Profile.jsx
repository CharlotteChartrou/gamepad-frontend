import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import user from "../assets/user.webp";

const Profile = ({ token, handleToken }) => {
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
      /*      console.log(response.data) */
      setIsLoading(false);
    };

    fecthData();
  }, []);

  return <>{isLoading ? <span>Chargement...</span> : <> </>}</>;
};

export default Profile;
