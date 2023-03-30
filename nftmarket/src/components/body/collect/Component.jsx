import { Row, Col, Button } from "antd";
import styled from "styled-components";
import CollectItemContainer from "./item/Container";
import SellContainer from "../../sell/Container";
const CollectComponent = ({
  tokenArr,
  type,
  account,
  web3,
  setTokenArr,
  tokenData,
}) => {
  return (
    <>
      <CollectDiv>
        {tokenArr.length ? (
          <>
            {type == "ownToken" || type == "salesToken" ? (
              <Row gutter={[16, 24]}>
                {tokenArr?.map((item, index) => {
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
                        <SellContainer
                          tokenData={tokenData}
                          web3={web3}
                          name={item.name}
                          account={account}
                        />
                      </Col>
                    </>
                  );
                })}
              </Row>
            ) : (
              <Row gutter={[16, 24]}>
                {tokenArr?.map((item, index) => {
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
                        tokenImage={item.tokenImage}
                      />
                    </Col>
                  );
                })}
              </Row>
            )}
          </>
        ) : (
          <div>
            <img src="/imgs/nothingHand.gif" alt="" />
          </div>
        )}
      </CollectDiv>
    </>
  );
};

const CollectDiv = styled.div`
  margin: 0 0 10% 0;
  & > div {
    margin: 20px 0;
    & > img {
      border: 1px solid black;
      border-radius: 10%;
      width: 300px;
    }
  }
`;

export default CollectComponent;
