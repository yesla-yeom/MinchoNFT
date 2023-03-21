import CollectComponent from "./Component";

const CollectContainer = () => {
  const tokenArr = [
    { tokenId: "나는", price: "1818ETH" },
    { tokenId: "언제", price: "188ETH" },
    { tokenId: "이것을", price: "28ETH" },
    { tokenId: "다", price: "54ETH" },
    { tokenId: "할수있냐", price: "694ETH" },
    { tokenId: "장정현", price: "421ETH" },
    { tokenId: "주거", price: "517ETH" },
    { tokenId: "!", price: "32154ETH" },
  ];

  return <CollectComponent tokenArr={tokenArr} />;
};

export default CollectContainer;
