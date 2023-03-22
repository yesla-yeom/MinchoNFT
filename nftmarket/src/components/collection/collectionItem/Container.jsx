import { useState } from "react";
import CollectionItemComponent from "./Component";

const CollectionItemContainer = ({ account, collectionArr }) => {
  const [isOrder, setIsOrder] = useState(false);
  return (
    <CollectionItemComponent account={account} collectionArr={collectionArr} />
  );
};

export default CollectionItemContainer;
