import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CollectionComponent from "./Component";
const CollectionContainer = ({ account }) => {
  const [order, setOrder] = useState("DESC");
  const [collectionArr, setCollection] = useState([{}]);
  const [collectionInfo, setCollectionInfo] = useState({});
  const [check, setCheck] = useState(false);
  const params = useParams();
  console.log(params);

  const findCollection = async () => {
    const data = await axios.post(
      "http://localhost:8080/api/allToken/collectionList",
      { tokenName: params.tokenName }
    );
    setCollectionInfo(data.data.searchInfo);
    setCollection(data.data.list);
    console.log(collectionInfo);
  };

  useEffect(() => {
    findCollection();
  }, [params, check]);

  return (
    <CollectionComponent
      collectionArr={collectionArr}
      setCollection={setCollection}
      order={order}
      setOrder={setOrder}
      collectionInfo={collectionInfo}
      setCollectionInfo={setCollectionInfo}
      check={check}
      setCheck={setCheck}
      account={account}
    />
  );
};

export default CollectionContainer;
