import { useWeb3React } from "@web3-react/core";
import MyNftComponent from "./Component";

const MyNftContainer = ({ web3 }) => {
  const { account } = useWeb3React();
  return <MyNftComponent account={account} web3={web3} />;
};

export default MyNftContainer;
