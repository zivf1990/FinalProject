import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/searched/${input}`);
  };

  return (
    <div className="search-component" onSubmit={handleSubmit}>
      <FaSearch />
      <input
        type="text"
        value={input}
        placeholder="Hello"
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
    </div>
  );
};

export default Search;
