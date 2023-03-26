import CollectItemComponent from "./Component";

const CollectItemContainer = ({ tokenName, price, way, tokenImage }) => {
  return (
    <CollectItemComponent
      tokenName={tokenName}
      price={price}
      way={way}
      tokenImage={tokenImage}
    />
  );
};

export default CollectItemContainer;
