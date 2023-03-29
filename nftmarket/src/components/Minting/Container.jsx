import MintingComponent from "./Component";
import axios from "axios";
import { useCallback, useState } from "react";

import useModal from "../utility/useModal";
import { useEffect } from "react";

function MintingContainer({ account, web3 }) {
  const [NftName, setName] = useState("");
  const [NftDescription, setDescription] = useState("");
  const [file, setFile] = useState();
  const [img, setImg] = useState("");
  const [check, setCheck] = useState(false);
  const [mintState, setMintState] = useState("");
  const [boolenstat, setBoolenstat] = useState(true);
  const [error, setError] = useState(false);

  // const { account, activate, deactivate, active } = useWeb3React();

  const nameInput = (e) => {
    setName(e.target.value);
  };

  const discriptionInput = (e) => {
    setDescription(e.target.value);
  };

  const fileChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.result) {
          setImg(reader.result);
        }
      };
    }
  }, []);

  const handleClick = (e) => {
    setCheck((check) => !check);
  };

  const mint = async () => {
    if (!NftName || !NftDescription || !file || !account || !check) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", NftName);
    formData.append("description", NftDescription);
    formData.append("from", account);

    try {
      setMintState("WAITING");

      const result = (
        await axios.post("http://localhost:8080/api/mint/minting", formData)
      ).data;
      if (result == "same name") {
        console.log("123ㄴ");
        setError(true);
      }
      let transactionResult = await web3.eth.sendTransaction(result);

      console.log("transactionResult:", transactionResult);
      const create = (
        await axios.post("http://localhost:8080/api/mint/create", {
          transactionResult,
        })
      ).data;

      setMintState("SUCCESS");

      // reset();
    } catch (error) {
      const cancle = (
        await axios.post("http://localhost:8080/api/mint/destroy", {
          error,
        })
      ).data;
      console.log("캔슬");
      setMintState("RESET");

      // reset();
    }
  };
  return (
    <div>
      <MintingComponent
        mint={mint}
        fileChange={fileChange}
        discriptionInput={discriptionInput}
        nameInput={nameInput}
        img={img}
        handleClick={handleClick}
        check={check}
        mintState={mintState}
        useModal={useModal}
        boolenstat={boolenstat}
        setBoolenstat={setBoolenstat}
        error={error}
        setError={setError}
        setName={setName}
      />
    </div>
  );
}

export default MintingContainer;
