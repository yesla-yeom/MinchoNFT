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
          <span>
            {collectionInfo.tokenOwner &&
              collectionInfo.tokenOwner.slice(0, 2) +
                collectionInfo.tokenOwner.slice(2, 5).toUpperCase() +
                "..." +
                collectionInfo.tokenOwner.slice(-5).toUpperCase()}
          </span>{" "}
          님의 전체 NFT
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
          <section>
            <div>
              <img
                src="https://media.giphy.com/media/wp2rA9gXbKXo0KzTjD/giphy.gif"
                alt=""
              />
            </div>
            <div>
              <div>No Results</div>
              <div>There is no icon name or alias similar to "{notFount}"</div>
            </div>
          </section>
        ) : (
          <>
            <div>{collectionArr.length} 개의 NFT</div>
            <div>
              {collectionArr.map((item, index) => (
                <Link
                  to={`/${collectionArr[0].tokenName}/${item.tokenId}`}
                  key={`collectionItemLink-${index}`}
                >
                  <div key={`collectionItemBox-${index}`}>
                    {item.tokenImage && (
                      <img
                        key={`collectionArr-image-${index}`}
                        src={
                          item.tokenImage.includes("imgs")
                            ? item.tokenImage
                            : `http://localhost:8080/upload/${item.tokenImage}`
                        }
                        alt=""
                      />
                    )}
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
        height: 90%;
        box-shadow: 1px 1px 1px 1px gray;
        border-radius: 10px;
        text-align: center;
        margin: 0 15px 15px 0;
        padding: 5px;
        & > img {
          width: 100%;
          height: 80%;
        }
      }
    }
  }

  & > section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0 0 0 6%;

    & > div:first-child {
      width: 5%;
      padding: 0 10px;
      img {
        width: 100%;
      }
    }
    & > div:last-child {
      & > div:first-child {
        font-weight: 850;
        font-size: 1.3rem;
      }
      & > div:last-child {
        font-weight: 750;
      }
    }
  }
`;
