import CollectItemComponent from "./Component";

const CollectItemContainer = ({ tokenName, price, way }) => {
  return <CollectItemComponent tokenName={tokenName} price={price} way={way} />;
};

export default CollectItemContainer;
