import { Row, Col, Button } from "antd";
import styled from "styled-components";
import CollectItemContainer from "./item/Container";
import { Link } from "react-router-dom";

const CollectComponent = ({ tokenArr }) => {
  return (
    <>
      <CollectDiv>
        <Row gutter={[16, 24]}>
          {tokenArr.map((item, index) => {
            return (
              <Col className="gutter-row" span={6} key={`Col-${index}`}>
                <CollectItemContainer
                  tokenName={item.name}
                  price={item.price}
                  key={`Card-${index}`}
                  way={index}
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
