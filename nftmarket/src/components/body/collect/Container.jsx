import { useState, useEffect } from "react";
import CollectComponent from "./Component";
import axios from "axios";

const CollectContainer = ({ type }) => {
  const [tokenArr, setTokenArr] = useState([]);

  // const tokenArr = await axios.post(`/api/allToken/latestToken`);

  const tokenData = async () => {
    const tokenArr = await axios.post(
      `http://localhost:8080/api/sortToken/${type}`
    );
    setTokenArr(tokenArr.data);
  };
  useEffect(() => {
    tokenData();
  }, [type]);
  console.log(tokenArr.data);

  return <CollectComponent tokenArr={tokenArr} />;
};

export default CollectContainer;
