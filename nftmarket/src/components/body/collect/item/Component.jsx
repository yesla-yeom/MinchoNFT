import { Card } from "antd";
const { Meta } = Card;

const CollectItemComponent = ({ tokenName, price }) => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="example" src="./imgs/brownBear.jpg" />}
    >
      <Meta title={tokenName} description={price} />
    </Card>
  );
};

export default CollectItemComponent;
