import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import TokenDetailComponent from "./Component";

const TokenDetailContainer = ({ account, web3 }) => {
  const [detail, setDetail] = useState({});
  const [txLog, setTxLog] = useState({});
  const [heart, setHeart] = useState();

  const params = useParams();

  const tokenDetail = useCallback(async () => {
    const data = (
      await axios.post("http://localhost:8080/api/nftToken/detail", {
        tokenId: params.tokenId,
      })
    ).data;
    setDetail(data);
    transactionLog(params.tokenId);
    const status = (
      await axios.post("http://localhost:8080/api/nftToken/likeState", {
        account,
        tokenId: params.tokenId,
      })
    ).data;
    if (status.status == 202) setHeart(false);
    else setHeart(true);
  }, [params, account]);

  const buyToken = async (_tokenId, _tokenOwner, _price) => {
    try {
      const result = (
        await axios.post("http://localhost:8080/api/nftToken/buyToken", {
          tokenId: _tokenId,
          account,
          tokenOwner: _tokenOwner,
          price: _price,
        })
      ).data;
      let transactionResult = await web3.eth.sendTransaction({
        ...result,
      });
      if (transactionResult) {
        await axios.post("http://localhost:8080/api/nftToken/updateList", {
          tokenId: _tokenId,
          account,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const transactionLog = async (_tokenId) => {
    const txLog = (
      await axios.post("http://localhost:8080/api/nftToken/txLog", {
        tokenId: _tokenId,
      })
    ).data;
    if (txLog.status == 200) setTxLog(txLog.txLogInfo);
  };

  const handleHeart = async (_tokenId) => {
    const likeResult = (
      await axios.post("http://localhost:8080/api/nftToken/like", {
        heart,
        account,
        tokenId: _tokenId,
      })
    ).data;
    if (likeResult.status == 201) setHeart(false);
    else setHeart(true);
  };

  useEffect(() => {
    tokenDetail();
  }, [params, account]);

  return (
    <TokenDetailComponent
      detail={detail}
      buyToken={buyToken}
      txLog={txLog}
      heart={heart}
      setHeart={setHeart}
      handleHeart={handleHeart}
    />
  );
};

export default TokenDetailContainer;
