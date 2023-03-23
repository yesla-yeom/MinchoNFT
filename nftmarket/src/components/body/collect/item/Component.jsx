import { Card } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
const { Meta } = Card;

const CollectItemComponent = ({ tokenName, price, way }) => {
  return (
    <NewCard
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <Link to={`/detail/${way}`}>
          <img
            alt="example"
            src="./imgs/brownBear.jpg"
            style={{ width: "240px" }}
          />
        </Link>
      }
    >
      <Link to={`/detail/${way}`}>
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
