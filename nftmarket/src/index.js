import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
// 리엑트 상에서 web3의 주요 기능을 사용하기 위해 상태 변환을 해주는 라이브러리
// web3 로 만들어서 썻던 것들을 미리 만들어둔 기능으로 사용 할 수 있다.
import { Web3Provider } from "@ethersproject/providers";
// web3를 인스턴스화(클래스로 만들어둔 객체들을 실제로 만드는 작업)
// 를 할 때 우리의 web3가 이더리움 네트워크의 어떤 노드와 소통 해야하는지 지정하는 역할을 한다.
// 메타마스크가 설치되어있으면 메타마스크를 web3 공급자로 사용한다.
const getLibrary = (provider) => {
  return new Web3Provider(provider);
};
// 인스턴스화 된 정보를 보내기 위해 함수를 선언해서 값을 반환 할 수 있도록 했음.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
