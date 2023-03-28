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

  const params = useParams();

  const tokenDetail = useCallback(async () => {
    const data = (
      await axios.post("http://localhost:8080/api/nftToken/detail", {
        tokenId: params.tokenId,
      })
    ).data;
    setDetail(data);
    transactionLog(params.tokenId);
  }, [params, account]);

  const buyToken = async (_tokenId, _tokenOwner, _price) => {
    setBuyState("WAITING");
    try {
      const result = (
        await axios.post("http://localhost:8080/api/nftToken/buyToken", {
          tokenId: _tokenId,
          account,
          tokenOwner: _tokenOwner,
          price: _price,
        })
      ).data;
      console.log(result);
      let transactionResult = await web3.eth.sendTransaction({
        ...result,
      });
      if (transactionResult) {
        await axios.post("http://localhost:8080/api/nftToken/updateList", {
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
      await axios.post("http://localhost:8080/api/nftToken/txLog", {
        tokenId: _tokenId,
      })
    ).data;
    if (txLog.status == 200) setTxLog(txLog.txLogInfo);
  };

  useEffect(() => {
    tokenDetail();
  }, [params, account]);

  return (
    <TokenDetailComponent
      detail={detail}
      buyToken={buyToken}
      txLog={txLog}
      useModal={useModal}
      boolenstat={boolenstat}
      setBoolenstat={setBoolenstat}
      buyState={buyState}
    />
  );
};

export default TokenDetailContainer;
