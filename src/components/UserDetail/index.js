import { useContext, useEffect } from "react";
import UseContext from "../UseContext";
import { useNavigate } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import "./index.css";

const UserDetail = () => {
  const { user, setUser } = useContext(UseContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user, setUser]);

  const backToHomePage = () => {
    navigate("/");
  };

  const navigateEditPage = () => {
    navigate("/update");
  };

  return (
    <div className="user-detail-container">
      <div className="user-form-home-edit-container">
        <button className="back-home-button" onClick={backToHomePage}>
          <BsArrowBarLeft className="home-back-icon" /> Home
        </button>
        <button className="edit-button" onClick={navigateEditPage}>
          Edit
        </button>
      </div>
      <div className="user-detail-card-container">
        {!user ? (
          <p>No user found (Internal Server Error)</p>
        ) : (
          <>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.DOB}</p>
            <p>{user.contact}</p>
            <p>{user.userDescription}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
