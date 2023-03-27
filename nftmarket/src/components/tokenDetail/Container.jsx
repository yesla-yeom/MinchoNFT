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
    try {
      const result = (
        await axios.post("http://localhost:8080/api/nftToken/buyToken", {
          tokenId: _tokenId,
          account,
          tokenOwner: _tokenOwner,
        })
      ).data;

      let transactionResult = await web3.eth.sendTransaction({
        from: result.from,
        to: result.to,
        data: result.data,
      });
      if (transactionResult) {
        await axios.post("http://localhost:8080/api/nftToken/updateList", {
          tokenId: _tokenId,
          account,
          tokenOwner: _tokenOwner,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const approvedFunc = async (_tokenId, _tokenOwner) => {
    const approved = (
      await axios.post("http://localhost:8080/api/nftToken/approve", {
        tokenOwner: _tokenOwner,
        tokenId: _tokenId,
      })
    ).data;
    let transactionApprove = await web3.eth.sendTransaction({
      from: approved.from,
      to: approved.to,
      data: approved.data,
    });
    saleTokenFunc();
  };

  const saleTokenFunc = async (_tokenId, _tokenOwner) => {
    const sale = (
      await axios.post("http://localhost:8080/api/nftToken/sale", {
        tokenOwner: _tokenOwner,
        tokenId: _tokenId,
      })
    ).data;
  };
  useEffect(() => {
    tokenDetail();
  }, [params, account]);

  return (
    <TokenDetailComponent
      detail={detail}
      buyToken={buyToken}
      approvedFunc={approvedFunc}
    />
  );
};

export default TokenDetailContainer;
