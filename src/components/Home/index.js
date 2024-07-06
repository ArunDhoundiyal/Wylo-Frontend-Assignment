import { useEffect, useState } from "react";
import UserList from "../UserList";
import axios from "axios";
import Create from "../Create";
import Sort from "../Sort";
import Pagination from "../Pagination";
import "./index.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [dataError, setDataError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("NORMAL");
  const [pagination, setPagination] = useState(1);

  const addNumber = () => {
    setPagination((preState) => preState + 1);
  };

  const minusNumber = () => {
    setPagination((preState) => Math.max(preState - 1, 1));
  };

  const onChangeSortOption = (updateSort) => {
    setSort(updateSort);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mangement-of-user-detail-system-1.onrender.com/user_management/?&sort=${sort}&page_no=${pagination}&search=${search}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setDataError(error);
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [sort, search, pagination]);

  const displayUserInfo = () => (
    <ul className="user-list-container">
      {data && data.length > 0 ? (
        data.map((userDetail) => (
          <UserList
            key={userDetail.id}
            userDetail={userDetail}
            setData={setData}
            setDataError={setDataError}
          />
        ))
      ) : (
        <p className="no-user-found">No users found.</p>
      )}
    </ul>
  );
  let display = "";
  if (loading) {
    display = <p className="bold">Loading...</p>;
  } else if (dataError) {
    display = <p className="bold">Create User ?</p>;
  } else {
    display = displayUserInfo();
  }

  return (
    <div className="bg-container">
      <div className="user-search-container">
        <input
          placeholder="Search user..."
          className="user-search-input"
          type="search"
          onChange={(event) => setSearch(event.target.value)}
        />
        <Sort onChangeSelectOption={onChangeSortOption} updatedValue={sort} />
      </div>

      <div
        className={
          loading || dataError || data.length === 0
            ? "loading-error"
            : "user-display-list-container"
        }
      >
        {display}
      </div>

      <Pagination increase={addNumber} decrease={minusNumber} />
      <Create />
    </div>
  );
};

export default Home;
