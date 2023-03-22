import styled from "styled-components";

const HeaderLogoComponent = () => {
  return (
    <ImgDiv>
      <img src="/imgs/mintChoLogo2.png" />
    </ImgDiv>
  );
};

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 7px 0;
  & > img {
    width: 120px;
  }
`;

export default HeaderLogoComponent;
