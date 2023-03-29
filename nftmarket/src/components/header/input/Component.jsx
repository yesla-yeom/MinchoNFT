import { Input } from "antd";
import { useState } from "react";
import styled from "styled-components";

const { Search } = Input;

const HeaderInputComponent = ({ navigate }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSearch = (value) => {
    navigate(`/search/token?name=${value}`);
    setInputValue("");
  };
  return (
    <InputDiv>
      <Search
        placeholder="어떤 NFT를 찾으시나요?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSearch={handleSearch}
        style={{
          width: 300,
        }}
      />
    </InputDiv>
  );
};

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HeaderInputComponent;
