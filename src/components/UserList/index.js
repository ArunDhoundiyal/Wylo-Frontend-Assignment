import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UseContext from "../UseContext";
import Delete from "../Delete";
import Edit from "../Edit";
import "./index.css";

const UserList = ({ userDetail, setData, setDataError }) => {
  const { setUser } = useContext(UseContext);
  const navigate = useNavigate();
  const handleClick = () => {
    setUser(userDetail);
    navigate("/user-detail");
  };
  const { name, DOB, id } = userDetail;
  return (
    <li className="user-list">
      <div className="name-dob-container" onClick={handleClick}>
        <h1 className="name-list-heading">{name}</h1>
        <p>{DOB}</p>
      </div>
      <div className="edit-delete-button-container">
        <Delete userId={id} setData={setData} setDataError={setDataError} />
        <Edit userDetail={userDetail} />
      </div>
    </li>
  );
};

export default UserList;
