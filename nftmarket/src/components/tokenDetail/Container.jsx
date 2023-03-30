import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import TokenDetailComponent from "./Component";
import useModal from "../utility/useModal";

const TokenDetailContainer = ({ account, web3 }) => {
  const [detail, setDetail] = useState({});
  const [txLog, setTxLog] = useState({});
  const [buyState, setBuyState] = useState("");
  const [boolenstat, setBoolenstat] = useState(true);
  const [heart, setHeart] = useState();
  const [likeCount, setLikeCount] = useState();

  const params = useParams();

  const tokenDetail = useCallback(async () => {
    const data = (
      await axios.post("/api/nftToken/detail", {
        tokenId: params.tokenId,
      })
    ).data;
    setDetail(data);
    transactionLog(params.tokenId);
    const status = (
      await axios.post("/api/nftToken/likeState", {
        account,
        tokenId: params.tokenId,
      })
    ).data;
    if (status.status == 202) setHeart(false);
    else setHeart(true);

    const result = (
      await axios.post("/api/nftToken/likeCount", {
        tokenId: params.tokenId,
      })
    ).data;
    setLikeCount(result.likeCount);
  }, [params, account, heart, likeCount]);

  const buyToken = async (_tokenId, _tokenOwner, _price) => {
    setBuyState("WAITING");
    try {
      const result = (
        await axios.post("/api/nftToken/buyToken", {
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
        await axios.post("/api/nftToken/updateList", {
          tokenId: _tokenId,
          account,
        });
      }
      setBuyState("SUCCESS");
    } catch (err) {
      console.log(err);
      setBuyState("SUCCESS");
    }
  };

  const transactionLog = async (_tokenId) => {
    const txLog = (
      await axios.post("/api/nftToken/txLog", {
        tokenId: _tokenId,
      })
    ).data;
    if (txLog.status == 200) setTxLog(txLog.txLogInfo);
  };

  const handleHeart = async (_tokenId) => {
    const likeResult = (
      await axios.post("/api/nftToken/like", {
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
  }, [params, account, heart, likeCount]);

  return (
    <TokenDetailComponent
      detail={detail}
      buyToken={buyToken}
      txLog={txLog}
      useModal={useModal}
      boolenstat={boolenstat}
      setBoolenstat={setBoolenstat}
      buyState={buyState}
      heart={heart}
      setHeart={setHeart}
      handleHeart={handleHeart}
      account={account}
      likeCount={likeCount}
    />
  );
};

export default TokenDetailContainer;
