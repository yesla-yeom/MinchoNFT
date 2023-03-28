import styled from "styled-components";

function MintingComponent({
  mint,
  fileChange,
  discriptionInput,
  nameInput,
  img,
  handleClick,
  NftName,
  NftDescription,
  mintState,
  useModal,
  boolenstat,

  setBoolenstat,
}) {
  return (
    <>
      <MintingBox>
        <div>Create New NFT</div>
        <ImageTitle>Image</ImageTitle>
        <ImageDetail>File types supported: JPG,PNG,SVG</ImageDetail>

        <FileAdd>
          <label className="file-label" htmlFor="chooseFile">
            Choose File
          </label>
          <input id="chooseFile" type="file" onInput={fileChange}></input>
          <FileImg src={img} alt="" />
        </FileAdd>

        <div>Name</div>
        <div>
          <input
            type="text"
            value={NftName}
            onInput={nameInput}
            placeholder="NFT name"
          ></input>
        </div>
        <div>
          <Discription>Description</Discription>
          <DiscriptionDetail>
            The description will be inculded on the item's detail page
            underneath its NFT
          </DiscriptionDetail>
          <div>
            <DescriptionInput
              type="text"
              value={NftDescription}
              onInput={discriptionInput}
              placeholder="Provide a detailed description of your item."
            ></DescriptionInput>
          </div>
        </div>
        <div>
          <Checkbox type="checkbox" onChange={handleClick}></Checkbox>
          [Terms and Conditions] I agree to provide a service fee of 2.5% to
          'Mintcho' in this transaction.
        </div>
        <CreateDiv>
          <CreateButton
            onClick={() => {
              mint();
              setBoolenstat(true);
            }}
          >
            Create
          </CreateButton>
        </CreateDiv>
      </MintingBox>
      {useModal("Minting", mintState, boolenstat, setBoolenstat)}
    </>
  );
}

const Checkbox = styled.input`
  width: 40px;
`;

const MintingBox = styled.div`
  box-sizing: border-box;
  padding: 0;
  margin: auto;
  width: 35%;
  & > div:first-child {
    font-size: 60px;
    font-weight: 500;
    color: rgba(176, 222, 219, 1);
  }
  & > div:nth-child(5) {
    font-size: 20px;
    padding: 10px 0px;
    color: rgba(252, 110, 94, 1);
  }

  & > div:nth-child(6) {
    & > input {
      border-radius: 10px;
      width: 700px;
      padding: 20px;
    }
    padding: 10px 0px;
  }
  & > div:nth-child(7) {
    & > div:first-child {
      font-size: 20px;
      color: rgba(252, 110, 94, 1);
      padding: 10px 0px;
    }
  }
`;

const ImageTitle = styled.div`
  font-weight: 700;
  color: rgba(252, 110, 94, 1);
  font-size: 20px;
`;

const ImageDetail = styled.div`
  padding: 10px 0px;
  color: rgba(88, 49, 49, 1);
`;

const FileAdd = styled.div`
  font-size: 20px;
  padding: 10px 0px;
  color: rgba(88, 49, 49, 1);
  .file-label {
    background-color: rgba(176, 222, 219, 1);
    border: 1px solid;
    padding: 5px;
    color: rgba(252, 110, 94, 1);
    text-align: center;
    margin-right: 20px;

    border-radius: 6px;
    cursor: pointer;
  }

  & > input[type="file"] {
    display: none;
    /* position: absolute; */
    /* width: 0; */
    /* height: 0; */
    /* padding: 0; */
    /* margin: -1px; */
    /* overflow: hidden; */
    /* clip: rect(0, 0, 0, 0); */
    /* border: 0; */
  }
`;

const Discription = styled.div``;

const DiscriptionDetail = styled.div`
  color: rgba(252, 110, 94, 1);
  font-size: 15px;
  padding: 10px 0px;
`;

const DescriptionInput = styled.input`
  border-radius: 10px;
  width: 700px;
  padding: 20px;
  margin-bottom: 30px;
`;

const CreateButton = styled.button`
  &:hover {
    background-color: rgba(252, 110, 94, 1);
  }
  width: 300px;
  padding: 10px;
  border-radius: 10px;
  border-color: white;
  background-color: rgba(176, 222, 219, 1);
  color: rgba(88, 49, 49, 1);
  cursor: pointer;
`;

const CreateDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const FileImg = styled.img`
  width: 250px;
`;

export default MintingComponent;
