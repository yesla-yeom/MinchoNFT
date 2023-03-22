import { Button, Dropdown } from "antd";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../utility/connect";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

const HeaderEditComponent = () => {
  const { account, activate, active, library } = useWeb3React();

  const sendTransaction = async () => {
    const signer = library.getSigner(account);
    const tx = await signer.sendTransaction({
      to: "0x1234567890123456789012345678901234567890",
      value: ethers.utils.parseEther("1.0"),
    });
    console.log("Transaction hash:", tx.hash);
  };
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
          <Link to={"/myNFT"}>
            <Button
              onClick={() => {
                sendTransaction();
              }}
            >
              My NFT
            </Button>
          </Link>
        </>
      ) : (
        <Button
          onClick={() => {
            activate(connectors.injected);
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
