import { useState, useEffect } from "react";
import CollectComponent from "./Component";
import axios from "axios";
import { useParams } from "react-router-dom";

const CollectContainer = ({ type, account }) => {
  const [tokenArr, setTokenArr] = useState([]);

  // const tokenArr = await axios.post(`/api/allToken/latestToken`);

  const params = useParams();

  const tokenData = async () => {
    const tokenArr = await axios.post(
      `http://localhost:8080/api/sortToken/${type}`,
      { userAccount: params.tokenOwner }
    );
    setTokenArr(tokenArr.data);
  };
  useEffect(() => {
    tokenData();
  }, [type]);

  return <CollectComponent tokenArr={tokenArr} account={account} />;
};

export default CollectContainer;
