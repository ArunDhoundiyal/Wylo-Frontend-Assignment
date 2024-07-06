import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import "./index.css";

const Delete = ({ userId, setData, setDataError }) => {
  const onDeleteUser = async (userId) => {
    try {
      const deleteUser = await axios.delete(
        `https://mangement-of-user-detail-system-1.onrender.com/user_management/${userId}`
      );
      setData(deleteUser);
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
