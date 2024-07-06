import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UseContext from "../UseContext";
import { TbEdit } from "react-icons/tb";
import "./index.css";
const Edit = ({ userDetail }) => {
  const { setUser } = useContext(UseContext);
  const navigate = useNavigate();
  const navigateToCreatePage = (userDetail) => {
    setUser(userDetail);
    navigate("/update");
  };
  return (
    <button
      className="delete-edit-button"
      onClick={() => navigateToCreatePage(userDetail)}
    >
      <TbEdit className="edit-icon" />
    </button>
  );
};

export default Edit;
