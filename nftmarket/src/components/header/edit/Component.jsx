import { Button } from "antd";
import styled from "styled-components";
import { useWeb3 } from "../../utility/useWeb3";

const HeaderEditComponent = () => {
  const { chainId, account, logIn } = useWeb3();
  console.log(account);
  console.log(chainId);
  return (
    <EditDiv>
      {account ? (
        <div style={{ display: "flex", columnGap: "10px" }}>
          <div>Account : {account}</div>
        </div>
      ) : (
        <Button
          onClick={() => {
            logIn();
          }}
        >
          지갑 연결
        </Button>
      )}
    </EditDiv>
  );
};

const EditDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HeaderEditComponent;
