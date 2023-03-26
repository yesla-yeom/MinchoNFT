import styled from "styled-components";
import { Link } from "react-router-dom";

const TokenDetailComponent = ({ detail, buyToken, approvedFunc }) => {
  return (
    <DetailBox>
      <div>
        <img
          src={
            detail.tokenImage && detail.tokenImage.includes("imgs")
              ? detail.tokenImage
              : `http://localhost:8080/upload/${detail.tokenImage}`
          }
          alt=""
        />
      </div>
      <div>
        <div>#{detail.tokenId}</div>
        <div>
          <div>컨트랙트 주소(CA) : </div>
          <div>
            {detail.ca && detail.ca.slice(0, 4) + " ... " + detail.ca.slice(-4)}
          </div>
        </div>
        <div>블록체인 : {detail.blockChainNetwork}</div>
        <div>토큰 기반: {detail.tokenBase}</div>
        <div>
          토큰 소유자 :{" "}
          {detail.tokenOwner &&
            detail.tokenOwner.slice(0, 2) +
              detail.tokenOwner.slice(2, 5).toUpperCase() +
              "..." +
              detail.tokenOwner.slice(-5)}
        </div>
        <div>가격 : {detail.price} Goerli</div>
        <div>
          <button
            onClick={() => {
              buyToken(detail.tokenId, detail.tokenOwner);
            }}
          >
            구매하기
          </button>
          <button
            onClick={() => {
              approvedFunc(detail.tokenId, detail.tokenOwner);
            }}
          >
            테스트용 승인버튼
          </button>
        </div>
        <div>
          <div>아이템 특성</div>
          {detail.rank && detail.type && (
            <>
              <div>Rank : {detail.rank} </div>
              <div>Type : {detail.type}</div>
            </>
          )}
        </div>
        <div>거래내역</div>
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
  & > div:first-child {
    width: 49%;
    & :first-child {
      width: 80%;
      & > img {
        width: 100%;
      }
    }
  }
  & > div:last-child {
    width: 49%;
    & > div {
      padding: 15px 0;
      & :first-child {
        font-size: 1.5rem;
        font-weight: 750;
      }
      &:nth-child(2) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & > div {
          padding: 0 5px 0 0;
        }
      }

      &:nth-child(7) {
        width: 95%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        & > button {
          width: 100%;
          padding: 2% 5%;
          margin: 0 10px;
          background-color: rgba(176, 222, 219, 1);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          color: rgba(88, 49, 49, 1);
          font-weight: 900;
          font-size: 1rem;
          white-space: nowrap;
          &:hover {
            color: white;
          }
        }
      }
      &:nth-child(8) > div {
        padding: 10px 0;
      }
    }
  }
`;
