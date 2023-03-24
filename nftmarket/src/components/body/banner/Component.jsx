import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";

const BannerComponent = () => {
  return (
    <BannerDiv>
      <div>
        <div>끼얏호우</div>
        <div>하하하하</div>
        <div>오늘은 상목이형 헬스하는날</div>
        <Link to={"/collections"}>
          <GotoAllButton>All Collections</GotoAllButton>
        </Link>
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
  font-weight: 700;
  &:hover {
    color: rgb(252, 110, 94) !important;
  }
`;

export default BannerComponent;
