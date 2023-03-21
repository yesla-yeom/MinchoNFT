import { Button, Dropdown } from "antd";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../utility/connect";

const HeaderEditComponent = ({ logIn }) => {
  const { account, activate, deactivate, active } = useWeb3React();

  const items = [
    {
      key: "1",
      label: <p>{account}</p>,
    },
  ];
  return (
    <EditDiv>
      {active ? (
        <>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Button>My Account</Button>
          </Dropdown>
          <Button>My NFT</Button>
        </>
      ) : (
        <Button
          onClick={() => {
            activate(connectors.injected);
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
  column-gap: 15px;
  justify-content: center;
  align-items: center;
`;

export default HeaderEditComponent;
