import SellMordalComponent from "./Component";

function SellMordalContainer({ account, web3, SetMordal, item, tokendata }) {
  return (
    <SellMordalComponent
      account={account}
      web3={web3}
      SetMordal={SetMordal}
      item={item}
      tokendata={tokendata}
    />
  );
}

export default SellMordalContainer;
