import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import TokenDetailComponent from "./Component";

const TokenDetailContainer = ({ account, web3 }) => {
  const [detail, setDetail] = useState({});

  const params = useParams();
  console.log(params);

  const tokenDetail = useCallback(async () => {
    const data = (
      await axios.post("http://localhost:8080/api/nftToken/detail", {
        tokenId: params.tokenId,
      })
    ).data;
    setDetail(data);
  }, [params, account]);

  const buyToken = async (_tokenId) => {
    const result = await axios.post("http://localhost:8080/api/nftToken/buy", {
      tokenId: _tokenId,
      from: account,
    });
    console.log(result);
  };

  useEffect(() => {
    tokenDetail();
  }, [params, account]);

  return <TokenDetailComponent detail={detail} buyToken={buyToken} />;
};

export default TokenDetailContainer;
