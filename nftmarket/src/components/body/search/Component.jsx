import styled from "styled-components";
import { Row, Col } from "antd";
import CollectItemContainer from "../collect/item/Container";

const SearchComponent = ({ tokenArr }) => {
  return (
    <CollectDiv>
      {tokenArr.length ? (
        <Row gutter={[16, 24]}>
          {tokenArr.map((item, index) => {
            return (
              <>
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
                    tokenImage={item.tokenImage}
                  />
                </Col>
              </>
            );
          })}
        </Row>
      ) : (
        <div>
          <img src="/imgs/nothingHand.gif" alt="" />
        </div>
      )}
    </CollectDiv>
  );
};

const CollectDiv = styled.div`
  & > div {
    margin: 20px 0;
    & > img {
      border: 1px solid black;
      border-radius: 10%;
      width: 300px;
    }
  }
`;

export default SearchComponent;
