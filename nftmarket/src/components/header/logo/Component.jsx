import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderLogoComponent = () => {
  return (
    <Link to={"/"}>
      <ImgDiv>
        <img src="/imgs/MintChoLogo2.png" />
      </ImgDiv>
    </Link>
  );
};

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 7px 0;
  &:hover {
    cursor: pointer;
  }
  & > img {
    width: 120px;
  }
`;

export default HeaderLogoComponent;
