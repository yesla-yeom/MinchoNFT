import styled from "styled-components";

const CollectionItemComponent = () => {
  const tempArr = [
    {
      tokenId: 0,
      name: "nftname1",
      description: "testing1",
      image: "/imgs/mincho.png",
    },
    {
      tokenId: 1,
      name: "nftname2",
      description: "testing2",
      image: "/imgs/mincho.png",
    },
    {
      tokenId: 2,
      name: "nftname3",
      description: "testing3",
      image: "/imgs/mincho.png",
    },
    {
      tokenId: 0,
      name: "nftname1",
      description: "testing1",
      image: "/imgs/mincho.png",
    },
    {
      tokenId: 1,
      name: "nftname2",
      description: "testing2",
      image: "/imgs/mincho.png",
    },
    {
      tokenId: 2,
      name: "nftname3",
      description: "testing3",
      image: "/imgs/mincho.png",
    },
    {
      tokenId: 0,
      name: "nftname1",
      description: "testing1",
      image: "/imgs/mincho.png",
    },
    {
      tokenId: 1,
      name: "nftname2",
      description: "testing2",
      image: "/imgs/mincho.png",
    },
    {
      tokenId: 2,
      name: "nftname3",
      description: "testing3",
      image: "/imgs/mincho.png",
    },
  ];
  return (
    <ItemBox>
      <div>소유자님의 전체 NFT</div>
      <div>
        <select>
          <option>가격 높은순</option>
          <option>가격 낮은순</option>
        </select>
        <input type={"text"} placeholder={"NFT 이름을 입력하세요"} />
      </div>
      <div>{tempArr.length} 개의 NFT</div>
      <div>
        {tempArr.map((item, index) => (
          <div>
            <img key={`tempArr-image-${index}`} src={item.image} />
            <div key={`tempArr-tokenId-${index}`}>{item.tokenId}</div>
            <div key={`tempArr-name-${index}`}>{item.name}</div>
            <div key={`tempArr-description-${index}`}>{item.description}</div>
          </div>
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
    margin: 0 auto;
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
    & > div {
      width: 19%;
      box-shadow: 1px 1px 1px 1px gray;
      border-radius: 10px;
      text-align: center;
      margin: 0 5px 0 0;
      padding: 5px;
      & > img {
        width: 100%;
      }
    }
  }
`;
