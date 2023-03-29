import styled from "styled-components";
import { Button } from "antd";

const BannerComponent = () => {
  return (
    <BannerDiv>
      <div>
        <div>NFT가 처음이세요?</div>
        <div>
          <p>국내에서 가장 쉬운 NFT 거래소</p> <p>민초</p>
          <p>와 함께 거래를 시작하세요</p>
        </div>
      </div>
    </BannerDiv>
  );
};

const BannerDiv = styled.div`
  font-family: var(--font-Dovemayo_gothic);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 420px;
  width: 100%;
  background-image: url("./imgs/bannerImg.jpg");
  border-radius: 20px;
  color: white;
  font-weight: 700;
  font-size: 24px;
  & > div {
    text-align: center;
    & > div {
      text-align: center;
      margin: 10px 0;
    }
    & > div:nth-child(2) {
      display: flex;
      column-gap: 5px;
      & > p:nth-child(2) {
        color: rgb(176, 222, 219);
      }
    }
  }
`;

const GotoAllButton = styled(Button)`
  font-weight: 700;
  &:hover {
    color: rgb(252, 110, 94) !important;
  }
`;

export default BannerComponent;
