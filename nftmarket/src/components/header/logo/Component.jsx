import styled from "styled-components";

const HeaderLogoComponent = () => {
  return <ImgDiv>여기는 로고 들어갈곳</ImgDiv>;
};

const ImgDiv = styled.div`
  & > img {
    width: 64px;
  }
`;

export default HeaderLogoComponent;
