import styled from "styled-components";
import { Link } from "react-router-dom";

const CollectionItemComponent = ({ account, collectionArr }) => {
  return (
    <ItemBox>
      <div>
        <span>{account}</span> 님의 전체 NFT
      </div>
      <div>
        <select>
          <option>가격 높은순</option>
          <option>가격 낮은순</option>
        </select>
        <input type={"text"} placeholder={"NFT 이름을 입력하세요"} />
      </div>
      <div>{collectionArr.length} 개의 NFT</div>
      <div>
        {collectionArr.map((item, index) => (
          <Link to={`/detail/${index}`}>
            <div>
              <img
                key={`collectionArr-image-${index}`}
                src={item.image}
                alt=""
              />
              <div key={`collectionArr-tokenId-${index}`}>{item.tokenId}</div>
              <div key={`collectionArr-name-${index}`}>{item.name}</div>
              <div key={`collectionArr-description-${index}`}>
                {item.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ItemBox>
  );
};

export default CollectionItemComponent;

const ItemBox = styled.div`
  width: fit-content;

  & > div {
    padding: 5px 0;
    width: 80%;
  }
  & > div:nth-child(2) {
    width: 100%;
    & > select {
      padding: 5px;
    }
    & > input {
      width: 70%;
      padding: 5px;
    }
  }
  & > div:last-child {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-item: center;
    flex-wrap: wrap;
    a {
      width: 15%;
      & > div {
        width: 100%;
        box-shadow: 1px 1px 1px 1px gray;
        border-radius: 10px;
        text-align: center;
        margin: 0 15px 15px 0;
        padding: 5px;
        & > img {
          width: 100%;
        }
      }
    }
  }
`;
