import { Routes, Route, Link } from "react-router-dom";

import TokenDetailContainer from "./components/tokenDetail/Container";
import MintingContainer from "./components/Minting/Container";

function App() {
  return (
    <>
      <div>Header</div>
      <Routes>
        <Route path="/minting" element={<MintingContainer />} />
        <Route
          path="/"
          element={
            <>
              <div>
                <div>
                  <Link to={"/detail/0"}>0</Link>
                </div>
                <div>
                  <Link to={"/detail/1"}>1</Link>
                </div>
                <div>
                  <Link to={"/detail/2"}>2</Link>
                </div>
              </div>
            </>
          }
        />
        <Route path="/detail/:tokenId" element={<TokenDetailContainer />} />
      </Routes>
      <div>Footer</div>
    </>
  );
}

export default App;
