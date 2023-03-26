import styled from "styled-components";
import SellMordalContainer from "./mordal/Container";

function SellComponent({
  mordal,
  SetMordal,
  web3,
  account,
  findItem,
  item,
  tokendata,
}) {
  console.log(item);
  return (
    <div>
      <div>
        <div>
          <div>
            <TokenImg
              src={`http://localhost:8080/upload/${item.tokenImage}`}
              alt=""
            />
          </div>
          <Name>{item.name}</Name>
          <TokenName>{item.tokenName}</TokenName>
          <ListingPrice>LISTING PRICE :{item.price} ETH</ListingPrice>

          <div style={{ paddingLeft: 40 }}>
            <Listbutton
              style={{ width: 100 }}
              onClick={() => {
                SetMordal(true);
                findItem(item.tokenId);
              }}
            >
              List for sale
            </Listbutton>
          </div>
        </div>
      </div>
      {mordal ? (
        <SellMordalContainer
          item={item}
          web3={web3}
          account={account}
          SetMordal={SetMordal}
          tokendata={tokendata}
        />
      ) : (
        <></>
      )}{" "}
    </div>
  );
}

const TokenImg = styled.img`
  width: 200px;
`;
const ListingPrice = styled.div`
  /* color: rgba(252, 110, 94, 1); */
  color: rgba(88, 88, 49, 1);
  font-size: 30px;
`;
const TokenName = styled.div`
  color: rgba(252, 110, 94, 1);
  font-size: 30px;
`;
const Name = styled.div`
  color: rgba(252, 110, 94, 1);
  font-size: 30px;
  font-weight: 600;
`;
const Listbutton = styled.button`
  padding: 10px;
  color: rgba(252, 110, 94, 1);
  border-radius: 10px;
  border: 1px solid rgb(176, 222, 219, 1);
  margin-bottom: 20px;
  background-color: rgba(176, 222, 219, 1);
`;

export default SellComponent;
