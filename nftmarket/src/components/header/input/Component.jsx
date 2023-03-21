import { Input, Space } from "antd";
import styled from "styled-components";
const { Search } = Input;

const HeaderInputComponent = () => {
  const onSearch = (value) => console.log(value);
  return (
    <InputDiv>
      <Search
        placeholder="어떤 NFT를 찾으시나요?"
        onSearch={onSearch}
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
