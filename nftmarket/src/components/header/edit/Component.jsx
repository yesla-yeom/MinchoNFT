import { Button, Dropdown } from "antd";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../utility/connect";
import { Link } from "react-router-dom";
import { WalletOutlined } from "@ant-design/icons";

const HeaderEditComponent = ({ logIn, handleCopy }) => {
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
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            onClick={() => {
              handleCopy(account);
            }}
          >
            <EditButton>My Account</EditButton>
          </Dropdown>
          <Link to={`/myNFT/${account}`}>
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
          <WalletOutlined />
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
