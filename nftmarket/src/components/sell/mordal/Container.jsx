import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import SellMordalComponent from "./Component";

function SellMordalContainer({ account, web3, SetMordal, item, tokendata }) {
  const [ethValue, setEthValue] = useState("");
  const [change, setChange] = useState("");
  const ethInput = useCallback((e) => {
    setEthValue(e.target.value);
  }, []);

  useEffect(() => {}, [change]);

  const listing = async () => {
    try {
      // if (ethValue == 0) return;
      const approve = (
        await axios.post("http://localhost:8080/api/sellToken/approve", {
          account,
        })
      ).data;
      console.log("approve:", approve);
      let transactionResult = await web3.eth.sendTransaction({
        to: approve.to,
        from: approve.from,
        data: approve.data,
        // gas: 1000000,
      });
      console.log("transactionResult :", transactionResult);

      // console.log(account);
      if (transactionResult) {
        console.log(typeof ethValue);
        // console.log("ethValue:", ethValue);
        const result = (
          await axios.post("http://localhost:8080/api/sellToken/listing", {
            ethValue,
            tokendata,
            account,
          })
        ).data;
        console.log("result:", result);
        let saleResult = await web3.eth.sendTransaction({
          to: result.to,
          from: result.from,
          data: result.data,
        });
        console.log("saleResult:", saleResult);
        if (saleResult) {
          const update = await axios.post(
            "http://localhost:8080/api/sellToken/update",
            {
              ethValue,
              tokendata,
              account,
            }
          );
          console.log("update:", update);
          setChange(update);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancle = async () => {
    try {
      const approvecancle = (
        await axios.post("http://localhost:8080/api/sellToken/cancle", {
          tokendata,
        })
      ).data;
      // console.log(approvecancle);
      let saleResult = await web3.eth.sendTransaction({
        to: approvecancle.to,
        from: approvecancle.from,
        data: approvecancle.data,
      });
      if (saleResult) {
        const cancleUpdate = (
          await axios.post("http://localhost:8080/api/sellToken/cancleUpdate", {
            tokendata,
          })
        ).data;
        console.log(cancleUpdate);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SellMordalComponent
      listing={listing}
      ethInput={ethInput}
      ethValue={ethValue}
      setEthValue={setEthValue}
      account={account}
      web3={web3}
      SetMordal={SetMordal}
      item={item}
      tokendata={tokendata}
      cancle={cancle}
    />
  );
}

export default SellMordalContainer;
