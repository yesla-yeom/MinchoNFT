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
  return (
    <div>
      <div>
        <div>
          <div>
            <img
              src={`http://localhost:8080/upload/${item.tokenImage}`}
              alt=""
            />
          </div>
          <button
            style={{ width: 100 }}
            onClick={() => {
              SetMordal(true);
              findItem(item.tokenId);
            }}
          >
            List for sale
          </button>
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

export default SellComponent;
