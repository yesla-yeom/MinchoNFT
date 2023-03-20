import axios from "axios";
import { useState, useEffect } from "react";

import TokenDetailComponent from "./Component";

const TokenDetailContainer = () => {
  const [detail, setDetail] = useState({
    tokenId: "",
    price: "",
    name: "",
    description: "",
    image: "",
    CA: "",
    blockChain: "",
    tokenOwner: "",
    tokenBase: "",
  });

  useEffect(() => {
    (async () => {
      setDetail(
        (await axios.get("http://localhost:8080/api/nftToken/detail")).data
      );
    })();
  }, []);

  return <TokenDetailComponent detail={detail} />;
};

export default TokenDetailContainer;
