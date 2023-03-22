import styled from "styled-components";
import { Button } from "antd";

const BannerComponent = () => {
  return (
    <BannerDiv>
      <div>
        <div>끼얏호우</div>
        <div>하하하하</div>
        <div>오늘은 상목이형 헬스하는날</div>
        <GotoAllButton type="primary">전체보기</GotoAllButton>
      </div>
    </BannerDiv>
  );
};

const BannerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 420px;
  width: 100%;
  background-image: url("./imgs/bannerImg.jpg");
  border-radius: 20px;
  color: white;
  & > div {
    text-align: center;
    & > div {
      text-align: center;
      margin: 10px 0;
    }
  }
`;

const GotoAllButton = styled(Button)`
  &:hover {
    background-color: #000000 !important;
    color: #000000 !important;
  }
`;

export default BannerComponent;
