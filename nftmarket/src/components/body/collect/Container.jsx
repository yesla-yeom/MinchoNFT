import CollectComponent from "./Component";

const CollectContainer = () => {
  const tokenArr = [
    { tokenId: "나는", price: "1818ETH", tokenName: "JLNToken" },
    { tokenId: "언제", price: "188ETH", tokenName: "JLNToken" },
    { tokenId: "이것을", price: "28ETH", tokenName: "JLNToken" },
    { tokenId: "다", price: "54ETH", tokenName: "JLNToken" },
    { tokenId: "할수있냐", price: "694ETH", tokenName: "JLNToken" },
    { tokenId: "장정현", price: "421ETH", tokenName: "JLNToken" },
    { tokenId: "주거", price: "517ETH", tokenName: "JLNToken" },
    { tokenId: "!", price: "32154ETH", tokenName: "JLNToken" },
  ];

  return <CollectComponent tokenArr={tokenArr} />;
};

export default CollectContainer;
