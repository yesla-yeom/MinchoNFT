import axios from "axios";
import { useEffect, useState } from "react";

import CollectionComponent from "./Component";
const CollectionContainer = ({ account }) => {
  const [collectionArr, setCollection] = useState([{}]);
  const findCollection = async () => {
    if (!account) return;
    const data = await axios.post(
      "http://localhost:8080/api/allToken/accountList",
      {
        account,
      }
    );
    console.log(data.data);
    setCollection(data.data.list);
  };

  useEffect(() => {
    findCollection();
  }, [account]);

  return (
    <CollectionComponent account={account} collectionArr={collectionArr} />
  );
};

export default CollectionContainer;
