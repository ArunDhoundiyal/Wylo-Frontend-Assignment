import axios from "axios";
import "./index.css";

const DeleteAll = ({ setData, data }) => {
  const onClickDeleteAll = () => {
    try {
      axios.delete(
        "https://wylo-backend-task-user-management.onrender.com/user_management"
      );
      setData([]);
      console.log(`All user data deleted`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="delete-all-button" onClick={onClickDeleteAll}>
      Delete All
    </button>
  );
};

export default DeleteAll;
