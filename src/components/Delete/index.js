import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import "./index.css";

const Delete = ({ userId, setData, setDataError }) => {
  const onDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://wylo-backend-task-user-management.onrender.com/user_management/${userId}`
      );
      setData((preData) => preData.filter((user) => user.id !== userId));
    } catch (error) {
      console.log(error);
      setDataError(error);
    }
  };
  return (
    <button
      className="delete-edit-button delete-button"
      onClick={() => onDeleteUser(userId)}
    >
      <MdDeleteOutline className="delete-icon" />
    </button>
  );
};

export default Delete;
