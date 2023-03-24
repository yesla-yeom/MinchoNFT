import { Button, Dropdown } from "antd";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../utility/connect";
import { Link } from "react-router-dom";

const HeaderEditComponent = ({ logIn }) => {
  const { account, activate, active } = useWeb3React();

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
          <Link to={"/minting"}>
            <EditButton>Minting NFT</EditButton>
          </Link>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <EditButton>My Account</EditButton>
          </Dropdown>
          <Link to={"/myNFT"}>
            <EditButton>My NFT</EditButton>
          </Link>
        </>
      ) : (
        <EditButton
          onClick={() => {
            activate(connectors.injected);
            logIn();
          }}
        >
          지갑 연결
        </EditButton>
      )}
    </EditDiv>
  );
};

const EditDiv = styled.div`
  display: flex;
  column-gap: 15px;
  justify-content: center;
  align-items: center;
  font-weight: 800;
`;
const EditButton = styled(Button)`
  font-weight: 700;
`;

export default HeaderEditComponent;
