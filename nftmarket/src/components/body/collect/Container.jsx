import CollectComponent from "./Component";

const CollectContainer = () => {
  const tokenArr = [
    { tokenId: "tlqkf", price: "1818ETH" },
    { tokenId: "tlqk", price: "188ETH" },
    { tokenId: "GLAEMSP", price: "28ETH" },
    { tokenId: "elwu", price: "54ETH" },
    { tokenId: "tbqkf", price: "694ETH" },
    { tokenId: "wlfkf", price: "421ETH" },
    { tokenId: "dksl", price: "517ETH" },
    { tokenId: "dlrjf", price: "32154ETH" },
  ];

  return <CollectComponent tokenArr={tokenArr} />;
};

export default CollectContainer;
