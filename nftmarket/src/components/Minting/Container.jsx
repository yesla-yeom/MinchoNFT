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
      const result = (await axios.post("/api/mint/minting", formData)).data;
      if (result == "same name") {
        console.log("123ㄴ");
        setError(true);
      }
      let transactionResult = await web3.eth.sendTransaction(result);
      const create = (
        await axios.post("/api/mint/create", {
          transactionResult,
        })
      ).data;

      setMintState("SUCCESS");
    } catch (error) {
      const cancle = (
        await axios.post("/api/mint/destroy", {
          error,
        })
      ).data;
      setMintState("RESET");
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
