import { useState } from "react";
import useFirestoreContext from "../hooks/useFirestoreContext";

const NavSerachForm = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const { filteredItems: filter } = useFirestoreContext();

  const onChangeHandler = (e) => {
    setSearchQuery(e.target.value);
    filter(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    filter(searchQuery);
  };

  return (
    <form className="d-flex" role="search" onSubmit={onSubmitHandler}>
      <input
        onChange={onChangeHandler}
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default NavSerachForm;
