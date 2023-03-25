import MintingComponent from "./Component";
import axios from "axios";
import { useCallback, useState } from "react";
// import { useWeb3React } from "@web3-react/core";
// import { connectors } from "../utility/connect";
import Web3 from "web3";
import { useWeb3 } from "../utility/useWeb3";

function MintingContainer({ account, web3 }) {
  const [NftName, setName] = useState("");
  const [NftDescription, setDescription] = useState("");
  const [file, setFile] = useState();
  const [img, setImg] = useState("");

  // const { account, activate, deactivate, active } = useWeb3React();

  const nameInput = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const discriptionInput = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const fileChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      // console.log(reader);
      reader.onload = () => {
        if (reader.result) {
          setImg(reader.result);
        }
      };
    }
  }, []);

  // const test = async () => {
  //   const result = await axios.post("http://localhost:8080/api/mint/network");
  //   console.log(result);
  // };
  // test();

  const mint = async () => {
    console.log(account);

    if (!NftName || !NftDescription || !file || !account) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", NftName);
    formData.append("description", NftDescription);
    formData.append("from", account);

    //메타마스크 거절눌렀을때 조건
    try {
      const result = (
        await axios.post("http://localhost:8080/api/mint/minting", formData)
      ).data;

      let transactionResult = await web3.eth.sendTransaction(result);

      console.log(transactionResult);
      const create = (
        await axios.post("http://localhost:8080/api/mint/create", {
          transactionResult,
        })
      ).data;

      console.log(create);
    } catch (error) {
      const cancle = (
        await axios.post("http://localhost:8080/api/mint/destroy", {
          error,
        })
      ).data;
    }

    // let signFrom = transactionResult.from;
    // console.log(signFrom);
  };

  return (
    <div>
      <MintingComponent
        mint={mint}
        fileChange={fileChange}
        discriptionInput={discriptionInput}
        nameInput={nameInput}
        img={img}
      />
    </div>
  );
}

export default MintingContainer;
