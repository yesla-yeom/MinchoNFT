import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CollectionComponent from "./Component";
const CollectionContainer = () => {
  const [collectionArr, setCollection] = useState([{}]);
  const params = useParams();

  // console.log(params);
  const findCollection = async () => {
    const data = await axios.post(
      "http://localhost:8080/api/allToken/collectionList"
    );
    console.log(data.data.list);
    setCollection(data.data.list);
  };

  useEffect(() => {
    findCollection();
  }, []);

  return (
    <CollectionComponent
      collectionArr={collectionArr}
      setCollection={setCollection}
    />
  );
};

export default CollectionContainer;
