import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import TokenDetailComponent from "./Component";

const TokenDetailContainer = () => {
  const [detail, setDetail] = useState({});

  const params = useParams();

  const tokenDetail = useCallback(async () => {
    const data = (
      await axios.post("http://localhost:8080/api/nftToken/detail", {
        tokenId: params.tokenId,
      })
    ).data;
    console.log(params.tokenId);
    console.log(data);
    setDetail(data);
  }, [params]);

  const buyToken = (_tokenId) => {
    axios.post("http://localhost:8080/api/nftToken/buy", { tokenId: _tokenId });
  };

  useEffect(() => {
    tokenDetail();
  }, []);

  return <TokenDetailComponent detail={detail} />;
};

export default TokenDetailContainer;
