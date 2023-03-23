import { useWeb3React } from "@web3-react/core";
import MyNftComponent from "./Component";

const MyNftContainer = () => {
  const { account } = useWeb3React();
  return <MyNftComponent account={account} />;
};

export default MyNftContainer;
