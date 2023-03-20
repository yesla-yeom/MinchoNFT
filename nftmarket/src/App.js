import { Routes, Route } from "react-router-dom";

import TokenDetailContainer from "./components/tokenDetail/Container";

function App() {
  return (
    <>
      <div>Header</div>
      <Routes>
        <Route path="/" element={<>여기는 홈이야</>} />
        <Route path="/detail" element={<TokenDetailContainer />} />
      </Routes>
      <div>Footer</div>
    </>
  );
}

export default App;
