import { Card, Row, Col } from "antd";

import CollectItemContainer from "./item/Container";
const { Meta } = Card;

const CollectComponent = ({ tokenArr }) => {
  return (
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
  );
};

export default CollectComponent;
