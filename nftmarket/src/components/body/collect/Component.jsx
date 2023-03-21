import { Row, Col } from "antd";
import styled from "styled-components";
import CollectItemContainer from "./item/Container";

const CollectComponent = ({ tokenArr }) => {
  return (
    <CollectDiv>
      <div>컬랙션 1입니다</div>
      <Row gutter={[16, 24]}>
        {tokenArr.map((item, index) => {
          return (
            <Col className="gutter-row" span={6} key={`Col-${index}`}>
              <CollectItemContainer
                tokenName={item.tokenId}
                price={item.price}
                key={`Card-${index}`}
              />
            </Col>
          );
        })}
      </Row>
    </CollectDiv>
  );
};

const CollectDiv = styled.div`
  & > div {
    margin: 20px 0;
  }
`;

export default CollectComponent;
