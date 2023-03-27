import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import Web3 from "web3";
import SellComponent from "./Component";

function SellContainer({ account, web3 }) {
  console.log(account);
  const [mordal, SetMordal] = useState(false);
  const [items, setItems] = useState([]);
  const [image, SetImage] = useState("");
  const [tokendata, setTokendata] = useState("");

  const find = async () => {
    try {
      const result = (
        await axios.post("http://localhost:8080/api/sellToken/find", {
          account: account,
        })
      ).data;
      if (result.status == 201) return;
      console.log(result);
      setItems(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findItem = async (item) => {
    try {
      const result = (
        await axios.post("http://localhost:8080/api/sellToken/tokendata", {
          tokenId: item,
        })
      ).data;
      console.log("이거", result);
      setTokendata(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    find();
  }, [account]);

  return (
    <>
      {account &&
        items?.map((item, index) => (
          <SellComponent
            key={`list-${index}`}
            item={item}
            findItem={findItem}
            account={account}
            web3={web3}
            mordal={mordal}
            SetMordal={SetMordal}
            tokendata={tokendata}
          />
        ))}
    </>
  );
}

export default SellContainer;
