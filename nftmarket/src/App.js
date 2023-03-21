import { Layout, theme } from "antd";
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

        <NftBody className="site-layout">
          123
          <div
            style={{
              padding: "64px 128px",
              background: colorBgContainer,
              backgroundColor: " rgba(227, 243, 247, 1)",
            }}
          >
            <Routes>
              <Route path="/minting" element={<MintingContainer />} />
              <Route
                path="/"
                element={
                  <>
                    <BodyContainer />
                    <CollectContainer />
                  </>
                }
              />
              <Route
                path="/detail/:tokenId"
                element={<TokenDetailContainer />}
              />
            </Routes>
          </div>
        </NftBody>
        <NftFooter>
          <p>여기는 푸터야</p>
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
  color: red;
`;

export default App;
