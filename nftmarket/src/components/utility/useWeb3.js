import { useCallback, useState } from "react";
import Web3 from "web3";
import axios from "axios";

export const useWeb3 = () => {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");

  const logIn = useCallback(async () => {
    try {
      if (window.ethereum) {
        const _web3 = new Web3(window.ethereum);
        setWeb3(_web3);

        const [_account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (_account) {
          setAccount(_account);
        }
        setChainId(window.ethereum.networkVersion);
      } else {
        console.log("MetaMask is not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { web3, account, chainId, logIn };
};
