import MintingComponent from "./Component";
import axios from "axios";
import { useCallback, useState } from "react";
// import { useWeb3React } from "@web3-react/core";
// import { connectors } from "../utility/connect";
import Web3 from "web3";
import { useWeb3 } from "../utility/useWeb3";

function MintingContainer({ account, web3 }) {
  // const { web3, account } = useWeb3();
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

  const mint = async () => {
    console.log(account);
    if (!NftName || !NftDescription || !file || !account) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", NftName);
    formData.append("description", NftDescription);
    formData.append("from", account);
    // console.log(formData);
    const result = (
      await axios.post("http://localhost:8080/api/mint/", formData)
    ).data;
    console.log(result);
    console.log("1");
    web3.eth.sendTransaction(result);
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
