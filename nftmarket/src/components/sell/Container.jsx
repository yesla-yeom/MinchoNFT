import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import Web3 from "web3";
import SellComponent from "./Component";

function SellContainer({ web3, name, account }) {
  console.log(account);
  const [mordal, SetMordal] = useState(false);
  // const [items, setItems] = useState([]);
  // const [image, SetImage] = useState("");
  const [tokendata, setTokendata] = useState("");

  // const find = async () => {
  //   try {
  //     const result = (
  //       await axios.post("http://localhost:8080/api/sellToken/find", {
  //         name: name,
  //       })
  //     ).data;
  //     if (result.status == 201) return;
  //     console.log(result);
  //     setItems(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const findItem = async (name) => {
    try {
      const result = (
        await axios.post("http://localhost:8080/api/sellToken/tokendata", {
          name: name,
        })
      ).data;
      console.log("이거", result);
      setTokendata(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   find();
  // }, [account]);

  return (
    <SellComponent
      findItem={findItem}
      account={account}
      web3={web3}
      mordal={mordal}
      SetMordal={SetMordal}
      tokendata={tokendata}
      name={name}
    />
  );
}

export default SellContainer;
