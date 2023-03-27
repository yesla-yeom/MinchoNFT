import styled from "styled-components";
import { useState } from "react";

const SellMordalComponent = ({
  SetMordal,
  account,
  web3,
  item,
  tokendata,
  setEthValue,
  ethValue,
  ethInput,
  listing,
  cancle,
}) => {
  console.log(tokendata);
  return (
    <ModalBackground>
      <MordalBox>
        <Test>
          <Search>List item</Search>
          <Imgtest>
            <ImgX
              onClick={(e) => {
                SetMordal(false);
              }}
              src="https://media.giphy.com/media/KFtoeyGbuENeJrnv2j/giphy.gif"
            ></ImgX>
          </Imgtest>
        </Test>
        <ERRor>
          <div>
            {tokendata.tokenImage && (
              <Mainimg
                src={`http://localhost:8080/upload/${tokendata.tokenImage}`}
                alt=""
              />
            )}
          </div>
          <Testtext>
            <div>
              <div>
                <span>Name:</span> {tokendata.name}
              </div>
            </div>
            <div>
              <div>
                <span>TokenName:</span> {tokendata.tokenName}
              </div>
            </div>
          </Testtext>
        </ERRor>
        <Pricetext>Set a price</Pricetext>
        <div style={{ paddingLeft: 20 }}>
          <Setinput
            value={ethValue}
            onInput={ethInput}
            placeholder="ETH Amount"
            type="Number"
          />
        </div>
        <Listingprice>
          <div>listing price</div>
          {ethValue ? <div>{ethValue}ETH</div> : <div>--ETH</div>}
        </Listingprice>
        <ButtonBox>
          <div>
            <Completelist onClick={listing}>Complete listing</Completelist>
          </div>
          <div>
            <CancleList onClick={cancle}>Cancle listing</CancleList>
          </div>
        </ButtonBox>
      </MordalBox>
    </ModalBackground>
  );
};

export default SellMordalComponent;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Imgtest = styled.div`
  /* margin-left: 20px; */
  /* position: absolute; */
`;
const Search = styled.div`
  font-size: 30px;
  color: rgb(88, 49, 49, 1);
`;
const ERRor = styled.div`
  padding-left: 20px;
  display: flex;
`;
const Test = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-around; */
`;
const Testtext = styled.div`
  & > div > div > span {
    color: rgb(88, 49, 49, 1);
    padding-right: 10px;
  }
  color: rgba(252, 110, 94, 1);
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-size: 20px;
  padding-left: 80px;
`;
const Mainimg = styled.img`
  width: 200px;
  /* height: 200px; */
`;

const ImgX = styled.img`
  width: 50px;
  cursor: pointer;
`;

const Pricetext = styled.div`
  font-size: 20px;
  padding-left: 20px;
  padding-top: 10px;
  color: rgb(88, 49, 49, 1);
`;

const Completelist = styled.button`
  &:hover {
    background-color: rgb(88, 49, 49, 1);
  }
  margin-top: 10px;
  font-size: 25px;
  color: rgb(252, 110, 94, 1);
  width: 250px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(176, 222, 219, 1);
  border: 2px solid rgb(88, 49, 49);
  cursor: pointer;
`;

const CancleList = styled.button`
  &:hover {
    background-color: rgb(88, 49, 49, 1);
  }
  margin-top: 10px;
  font-size: 25px;
  color: rgb(252, 110, 94, 1);
  width: 250px;
  padding: 20px;
  cursor: pointer;

  border-radius: 10px;
  background-color: rgba(176, 222, 219, 1);
  border: 2px solid rgb(88, 49, 49);
`;

const Listingprice = styled.div`
  font-size: 20px;
  padding-left: 20px;
  padding-top: 10px;
  color: rgb(88, 49, 49, 1);
`;

const Setinput = styled.input`
  width: 500px;
  padding: 10px;
  border-radius: 10px;
  background-color: rgb(227, 243, 247);
  border: 1px solid rgb(88, 49, 49);
`;

const MordalBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
  height: 500px;
  width: 550px;
  border: 2px solid #565d79;
  border-radius: 10px;
  /* background-color: white; */
  background-color: rgba(176, 222, 219, 1);
  /* background-repeat: no-repeat; */
  /* background-position: 10% 1%; */
  /* background-color: rgba(0, 0, 0, 0.45); */
  /* z-index: 1000; */

  /* @media (max-width: 650px) {
    width: 80%;
  } */

  img {
    /* width: 20px; */
    /* cursor: pointer; */
  }

  /* .regist > div:first-child {
    margin-top: 6px;
    color: #3399ff;
    font-weight: 600;
  }
  .regist > div:last-child {
    color: #666666;
    font-size: 12px;
  } */

  /* .regist {
    width: 400px;
    height: 60px;
    border: 1px solid #3399ff;
    margin-top: 30px;
    margin-left: 70px;
    text-align: center;
    cursor: pointer;

    @media (max-width: 650px) {
      width: 60%;
      margin: auto;
    }
  } */

  /* .login {
    width: 100px;
    height: 100px;
    background-color: #3399ff;
    color: white;
    border: none;
  }
  input {
    width: 280px;
    height: 28px;
    border: solid 1px #e1e1e2;
    padding: 10px;

    @media (max-width: 650px) {
      width: 100%;
      margin: auto;
    }
  } */

  & > div:first-child {
    height: 65px;
    border-bottom: 1px solid #e0e3ea;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding: 20px;
  }

  & > div:first-child > div:last-child {
    margin-bottom: 20px;
  }

  .flex {
    display: flex;
    justify-content: center;
    padding-top: 50px;

    @media (max-width: 650px) {
      width: 80%;
      padding: 0;
      margin: 40px auto;
    }
  }

  .inputBox {
    width: 100%;
  }
`;
