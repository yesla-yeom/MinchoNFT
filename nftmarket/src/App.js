import { Layout, theme } from "antd";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import HeaderContainer from "./components/header/Container";
import TokenDetailContainer from "./components/tokenDetail/Container";
import MintingContainer from "./components/Minting/Container";
import CollectContainer from "./components/body/collect/Container";
import BannerContainer from "./components/body/banner/Container";
import MyNftContainer from "./components/myNFT/Container";
import CollectionContainer from "./components/collection/Container";
import QnaContainer from "./components/qna/Container";
import FooterContainer from "./components/footer/Container";
import WaitingStatusContainer from "./components/waitingStatus/Container";
import SearchContainer from "./components/body/search/Container";
import CollectionHeaderContainer from "./components/collection/collectionHeader/Container";

import { useWeb3 } from "./components/utility/useWeb3";
import SellContainer from "./components/sell/Container";

const { Header, Content, Footer } = Layout;

function App() {
  useEffect(() => {
    (async () => {
      await axios.get("http://localhost:8080/api/allToken/list");
    })();
  }, []);
  const { account, logIn, web3 } = useWeb3();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout
        style={{
          backgroundColor: "rgba(227, 243, 247, 0.5)",
        }}
      >
        <NftHeader>
          <HeaderContainer logIn={logIn} />
        </NftHeader>

        <NftBody className="site-layout">
          <Routes>
            <Route
              path="/sell"
              element={<SellContainer account={account} web3={web3} />}
            />

            <Route
              path="/minting"
              element={<MintingContainer account={account} web3={web3} />}
            />
            <Route
              path="/"
              element={
                <>
                  <BannerContainer />
                  <div
                    style={{
                      padding: "64px 128px",
                      background: colorBgContainer,
                      backgroundColor: " rgba(227, 243, 247, 1)",
                    }}
                  >
                    <CollectionHeaderContainer header={"Latest Tokens"} />
                    <CollectContainer type={"latestToken"} />
                  </div>
                </>
              }
            />
            <Route
              path="/:tokenName"
              element={<CollectionContainer account={account} />}
            />
            <Route
              path="/:tokenName/:tokenId"
              element={<TokenDetailContainer account={account} web3={web3} />}
            />
            <Route path="/qna" element={<QnaContainer />} />
            <Route
              path="/myNFT/:tokenOwner"
              element={<MyNftContainer web3={web3} />}
            />
            <Route path="/search/:query" element={<SearchContainer />} />
          </Routes>
        </NftBody>
        <NftFooter>
          <FooterContainer />
        </NftFooter>
      </Layout>
    </>
  );
}

const NftHeader = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  color: white;
  background-color: rgba(176, 222, 219, 1);
  & > div {
    width: 100%;
    display: flex;
    color: red;
    justify-content: space-between;
    align-items: center;
  }
`;
const NftBody = styled(Content)`
  padding: 0 50px;
  margin: 16px 0;
  background-color: rgba(227, 243, 247, 1);
`;
const NftFooter = styled(Footer)`
  text-align: center;
  background-color: rgba(176, 222, 219, 1);
`;

export default App;
