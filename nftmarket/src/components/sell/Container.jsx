import axios from "axios";
import { useState } from "react";
import SellComponent from "./Component";

function SellContainer({ web3, name, account, tokenData }) {
  const [mordal, SetMordal] = useState(false);
  const [tokendata, setTokendata] = useState("");

  const findItem = async (name) => {
    try {
      const result = (
        await axios.post("/api/sellToken/tokendata", {
          name: name,
        })
      ).data;

      setTokendata(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SellComponent
      findItem={findItem}
      account={account}
      web3={web3}
      mordal={mordal}
      SetMordal={SetMordal}
      tokendata={tokendata}
      name={name}
      tokenData={tokenData}
    />
  );
}

export default SellContainer;
