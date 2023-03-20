
import { Routes, Route } from "react-router-dom";

import TokenDetailContainer from "./components/tokenDetail/Container";
import MintingContainer from "./components/Minting/Container";

function App() {
  return (
    <>
      <div>Header</div>
      <MintingContainer />
      <Routes>
        <Route path="/" element={<>여기는 홈이야</>} />
        <Route path="/detail" element={<TokenDetailContainer />} />
      </Routes>
      <div>Footer</div>
    </>
  );
}

export default App;
