import { Row, Col, Button } from "antd";
import styled from "styled-components";
import CollectItemContainer from "./item/Container";
import { Link } from "react-router-dom";

const CollectComponent = ({ tokenArr }) => {
  return (
    <>
      <CollectOutterDiv>
        <Button type="text">NEW NFT TOKEN</Button>
        <Button type="text">VIEW MORE</Button>
      </CollectOutterDiv>
      <CollectDiv>
        <Row gutter={[16, 24]}>
          {tokenArr.map((item, index) => {
            return (
              <Col className="gutter-row" span={6} key={`Col-${index}`}>
                <Link to={`/${item.tokenName}`}>
                  <CollectItemContainer
                    tokenName={item.tokenId}
                    price={item.price}
                    key={`Card-${index}`}
                  />
                </Link>
              </Col>
            );
          })}
        </Row>
      </CollectDiv>
    </>
  );
};

const CollectDiv = styled.div`
  border 2px solid rgb(88, 49, 49);
  border-radius : 15px;
  padding:0 15px;
   & > div {
    margin: 20px 0;
  }
`;

const CollectOutterDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default CollectComponent;
