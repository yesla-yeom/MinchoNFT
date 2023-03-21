
import { Card, Col, Row, Layout, theme } from "antd";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import HeaderContainer from "./components/header/Container";
import TokenDetailContainer from "./components/tokenDetail/Container";
import MintingContainer from "./components/Minting/Container";
import CollectContainer from "./components/body/collect/Container";
import BodyContainer from "./components/body/Container";
const { Header, Content, Footer } = Layout;

function App() {
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
          <HeaderContainer />
        </NftHeader>
        <Routes>
        <Route path="/minting" element={<MintingContainer />} />
        <Route path="/" element={<>여기는 홈이야</>} />
        <Route path="/detail" element={<TokenDetailContainer />} />
        </Routes>
        <NftBody className="site-layout">
          <div
            style={{
              padding: "64px 128px",
              minHeight: 3800,
              background: colorBgContainer,
              backgroundColor: "purple",
            }}
          >
            <BodyContainer />
            <div>
              <CollectContainer />
            </div>
          </div>
        </NftBody>
        <NftFooter>대충 알아서 짜기</NftFooter>
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
  }
`;
const NftBody = styled(Content)`
  padding: 0 50px;
  margin: 16px 0;
  background-color: black;
`;
const NftFooter = styled(Footer)`
  text-align: center;
  background-color: blue;
  color: red;
`;

export default App;
