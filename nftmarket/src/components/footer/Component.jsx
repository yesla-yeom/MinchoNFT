import styled from "styled-components";

const FooterComponent = () => {
  return (
    <FooterDiv>
      <div>
        <h2>published by : MintChoNFT</h2>
      </div>
    </FooterDiv>
  );
};

const FooterDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default FooterComponent;
