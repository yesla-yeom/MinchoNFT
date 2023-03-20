import styled from "styled-components";
import { Link } from "react-router-dom";

const TokenDetailComponent = () => {
  return (
    <DetailBox>
      <div>
        <img src="./imgs/brownBear.jpg" alt="" />
      </div>
      <div>
        <div>#4278</div>
        <div>
          <div>컨트랙트 주소 : </div>
          <div>0x682371274859</div>
        </div>
        <div>블록체인 : ethereum</div>
        <div>토큰 기반: ERC-721</div>
        <div>토큰 소유자 : 0xasdasdasd</div>
        <div>가격 : 1Goerli</div>
        <div>
          <button>구매하기</button>
        </div>
        <div>
          <div>아이템 특성</div>
          <div>Rank</div>
          <div>Type</div>
        </div>
        <div>
          <Link to={"/"}>전체 목록 보기</Link>
        </div>
      </div>
    </DetailBox>
  );
};

export default TokenDetailComponent;

const DetailBox = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 3% 0 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
  & > div {
    width: 49%;
    &: first-child {
      width: 37%;
      & > img {
        width: 100%;
      }
    }

    &:last-child > div {
      padding: 15px 0;
      &: first-child {
        font-size: 1.5rem;
        font-weight: 750;
      }
      &:nth-child(2) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      &:nth-child(7) {
        width: fit-content;
        margin: 0 auto;
        & > button {
          padding: 10px 200px;
          background-color: #b0dedb;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          color: white;
          font-weight: 900;
          font-size: 1rem;
        }
      }
      &:nth-child(8) > div {
        padding: 10px 0;
      }
    }
  }
`;
