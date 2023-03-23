import styled from "styled-components";
import { Link } from "react-router-dom";

const CollectionItemComponent = ({
  collectionArr,
  search,
  setSearch,
  findSearch,
  setOrder,
  order,
  check,
  setCheck,
  collectionInfo,
  notFount,
  setNotFount,
}) => {
  return (
    <ItemBox>
      <>
        <div>
          <span>{collectionInfo.tokenOwner}</span> 님의 전체 NFT
        </div>
        <div>
          <div>
            <select
              onChange={(e) => {
                setOrder(e.target.value);
              }}
            >
              <option value={"DESC"}>가격 높은순</option>
              <option value={"ASC"}>가격 낮은순</option>
            </select>
          </div>
          <div>
            <input
              type={"text"}
              placeholder={"NFT 이름을 입력하세요"}
              value={search}
              onInput={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                findSearch(search, order);
                setNotFount(search);
                setSearch("");
                setCheck(false);
              }}
            >
              <img
                src="https://media.giphy.com/media/wp2rA9gXbKXo0KzTjD/giphy.gif"
                alt=""
              />
            </button>
          </div>
        </div>
        {check ? (
          <>
            <div>{notFount}</div>
          </>
        ) : (
          <>
            <div>{collectionArr.length} 개의 NFT</div>
            <div>
              {collectionArr.map((item, index) => (
                <Link
                  to={`/${collectionArr[0].tokenName}/${index}`}
                  key={`collectionItemLink-${index}`}
                >
                  <div key={`collectionItemBox-${index}`}>
                    <img
                      key={`collectionArr-image-${index}`}
                      src={item.image}
                      alt=""
                    />
                    <div key={`collectionArr-tokenId-${index}`}>
                      {item.tokenId}
                    </div>
                    <div key={`collectionArr-name-${index}`}>{item.name}</div>
                    <div key={`collectionArr-description-${index}`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>{" "}
          </>
        )}
      </>
    </ItemBox>
  );
};

export default CollectionItemComponent;

const ItemBox = styled.div`
  & > div {
    padding: 5px 0;
    width: 80%;
  }
  & > div:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div:nth-child(2) {
      width: 100%;
    }
    & > div {
      & > select {
        width: fit-content;
        padding: 5px;
      }
      & > input {
        width: 100%;
        padding: 5px;
      }
      & > button {
        width: 45px;
        cursor: pointer;
        border: none;
        & > img {
          width: 100%;
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  & > div:last-child {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-item: center;
    flex-wrap: wrap;
    a {
      width: 30%;
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
