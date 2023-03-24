import { Row, Col, Button } from "antd";
import styled from "styled-components";
import CollectItemContainer from "./item/Container";

const CollectComponent = ({ tokenArr, account }) => {
  return (
    <>
      <CollectDiv>
        <Row gutter={[16, 24]}>
          {tokenArr.map((item, index) => {
            return (
              <Col className="gutter-row" span={6} key={`Col-${index}`}>
                <CollectItemContainer
                  tokenName={item.name}
                  price={`${item.price} ETH`}
                  key={`Card-${index}`}
                  way={
                    item.tokenId
                      ? `${item.tokenName}/${item.tokenId}`
                      : item.tokenName
                  }
                />
              </Col>
            );
          })}
        </Row>
      </CollectDiv>
    </>
  );
};

const CollectDiv = styled.div`
  & > div {
    margin: 20px 0;
  }
`;

const CollectOutterDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default CollectComponent;
