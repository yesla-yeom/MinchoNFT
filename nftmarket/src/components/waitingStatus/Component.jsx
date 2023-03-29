import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { Modal } from "antd";
import useModal from "../utility/useModal";

import { useState, useEffect } from "react";
const myDiv = () => {
  return <div>asdf</div>;
};
const info = () => {
  MyModal.info({
    title: "This is a notification message",
    okButtonProps: {
      disabled: false,
    },
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
    className: "custom-modal",
  });
};

const WaitingStatusComponent = () => {
  const { library, account } = useWeb3React();
  const [signatureStatus, setSignatureStatus] = useState(null);

  const signMessage = async () => {
    if (!library || !account) {
      return;
    }

    const message = "Hello, world!";

    setSignatureStatus("WAITING");
    await library.getSigner(account).signMessage(message);
    setSignatureStatus("SUCCESS");
  };
  useEffect(() => {
    signMessage();
  }, [account]);

  return (
    <div>
      {useModal("MINT", signatureStatus)}

      {signatureStatus}
    </div>
  );
};

const MyModal = styled(Modal)`
  .ant-modal-content {
    background-color: #f0f0f0;
  }
`;

export default WaitingStatusComponent;
