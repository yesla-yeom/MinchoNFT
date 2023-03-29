import { Input } from "antd";
import styled from "styled-components";
const { Search } = Input;

const HeaderInputComponent = ({ navigate }) => {
  return (
    <InputDiv>
      <Search
        placeholder="어떤 NFT를 찾으시나요?"
        onSearch={(value) => {
          navigate(`/search/token?name=${value}`);
        }}
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
