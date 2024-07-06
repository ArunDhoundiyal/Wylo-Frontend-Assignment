import "./index.css";

const Sort = ({ onChangeSelectOption, updatedValue }) => {
  const onClickSortOption = (event) => {
    onChangeSelectOption(event.target.value);
  };

  return (
    <div className="sort-container">
      <div className="sorting-container">
        <span className="sort_birth_date">Sort Birth Date: </span>
        <select
          value={updatedValue}
          className="select-option"
          onChange={onClickSortOption}
        >
          <option value="ASC">Asc</option>
          <option value="DESC">Desc</option>
          <option value="NORMAL">Norm</option>
        </select>
      </div>
    </div>
  );
};

export default Sort;
