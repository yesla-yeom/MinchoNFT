import CollectItemComponent from "./Component";

const CollectItemContainer = ({ tokenName, price }) => {
  return <CollectItemComponent tokenName={tokenName} price={price} />;
};

export default CollectItemContainer;
