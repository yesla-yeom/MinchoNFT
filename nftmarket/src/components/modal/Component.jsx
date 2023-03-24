import styled from "styled-components";

const ModalComponent = () => {
  return (
    <>
      <ModalMask></ModalMask>
    </>
  );
};
const ModalMask = styled.div`
  position: fixed;
  top: 0;
  inset-inline-end: 0;
  bottom: 0;
  inset-inline-start: 0;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.45);
`;

export default ModalComponent;
