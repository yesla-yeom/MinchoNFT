import styled from "styled-components";

const CollectionHeaderComponent = ({ header }) => {
  return <HeaderDiv>{header}</HeaderDiv>;
};

const HeaderDiv = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export default CollectionHeaderComponent;
