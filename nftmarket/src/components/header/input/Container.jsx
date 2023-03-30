import HeaderInputComponent from "./Component";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeaderInputContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleSearch = (value) => {
    navigate(`/search/token?name=${value}`);
    setInputValue("");
  };

  return (
    <HeaderInputComponent
      navigate={navigate}
      handleSearch={handleSearch}
      inputValue={inputValue}
      setInputValue={setInputValue}
    />
  );
};

export default HeaderInputContainer;
