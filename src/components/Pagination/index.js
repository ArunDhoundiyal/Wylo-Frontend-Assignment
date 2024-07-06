import "./index.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
const Pagination = ({ increase, decrease }) => {
  const onDecrementNumber = () => {
    decrease();
  };
  const onIncrementNumber = () => {
    increase();
  };
  return (
    <div className="pagination-container">
      <button className="left-arrow-button" onClick={onDecrementNumber}>
        <FaArrowLeftLong />
      </button>
      <button className="right-arrow-button" onClick={onIncrementNumber}>
        <FaArrowRightLong />
      </button>
    </div>
  );
};

export default Pagination;
