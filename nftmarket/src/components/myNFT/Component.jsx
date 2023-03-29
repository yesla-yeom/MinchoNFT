import { Segmented, Tabs } from "antd";
import styled from "styled-components";
import CollectContainer from "../body/collect/Container";
import { useState, useEffect } from "react";

const MyNftComponent = ({ account, web3 }) => {
  const [selected, setSelectd] = useState("ownToken");
  useEffect(() => {}, [account]);
  const onChange = (key) => {
    if (key == 1) {
      setSelectd("ownToken");
    } else if (key == 2) {
      setSelectd("mintToken");
    } else if (key == 3) {
      setSelectd("salesToken");
    }
  };

  const items = [
    {
      key: "1",
      label: `Own Token`,
    },
    {
      key: "2",
      label: `Minted Token`,
    },
    {
      key: "3",
      label: `Sales Token`,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <CollectContainer type={selected} account={account} web3={web3} />
    </>
  );
};

export default MyNftComponent;
