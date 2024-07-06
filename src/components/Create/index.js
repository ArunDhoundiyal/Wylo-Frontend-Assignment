import { useNavigate } from "react-router-dom";
import { MdOutlineCreate } from "react-icons/md";
import "./index.css";
const Create = () => {
  const navigate = useNavigate();
  const navigateToUserForm = () => {
    navigate("/user-form");
  };
  return (
    <div className="create-container">
      <button className="create-button" onClick={navigateToUserForm}>
        <MdOutlineCreate className="create-button-logo" /> Create
      </button>
    </div>
  );
};
export default Create;
