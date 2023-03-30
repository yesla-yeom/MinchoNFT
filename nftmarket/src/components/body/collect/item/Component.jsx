import { Card } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
const { Meta } = Card;

const CollectItemComponent = ({ tokenName, price, way, tokenImage }) => {
  return (
    <NewCard
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <Link to={`/${way}`}>
          <img
            alt="example"
            src={
              tokenImage.includes("imgs") ? tokenImage : `/upload/${tokenImage}`
            }
            style={{ width: "240px", height: "240px" }}
          />
        </Link>
      }
    >
      <Link to={`/${way}`}>
        <Meta title={tokenName} description={price} />
      </Link>
    </NewCard>
  );
};

const NewCard = styled(Card)`
  &:hover {
    cursor: default;
  }
`;

export default CollectItemComponent;
