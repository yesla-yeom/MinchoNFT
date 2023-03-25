import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import TokenDetailComponent from "./Component";

const TokenDetailContainer = ({ account, web3 }) => {
  const [detail, setDetail] = useState({});

  const params = useParams();

  const tokenDetail = useCallback(async () => {
    const data = (
      await axios.post("http://localhost:8080/api/nftToken/detail", {
        tokenId: params.tokenId,
      })
    ).data;
    setDetail(data);
  }, [params, account]);

  const buyToken = async (_tokenId, _tokenOwner) => {
    const result = (
      await axios.post("http://localhost:8080/api/nftToken/buyToken", {
        tokenId: _tokenId,
        from: account,
        tokenOwner: _tokenOwner,
      })
    ).data;

    let transactionResult = await web3.eth.sendTransaction({
      from: result.obj.from,
      to: result.obj.to,
      value: result.price,
    });
    console.log(transactionResult);
    web3.eth.subscribe("logs", { address: result.ca }).on("data", (log) => {
      console.log("front", log);
    });
  };

  useEffect(() => {
    tokenDetail();
  }, [params, account]);

  return <TokenDetailComponent detail={detail} buyToken={buyToken} />;
};

export default TokenDetailContainer;
