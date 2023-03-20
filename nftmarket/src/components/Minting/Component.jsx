import styled from "styled-components";

function MintingComponent({
  mint,
  fileChange,
  discriptionInput,
  nameInput,
  img,
}) {
  return (
    <MintingBox>
      <div>Create New NFT</div>
      <ImageTitle>Image</ImageTitle>
      <ImageDetail>File types supported: JPG,PNG,SVG</ImageDetail>
      <FileAdd>
        <input type="file" onInput={fileChange}></input>
        <FileImg src={img} alt="" />
      </FileAdd>

      <div>Name</div>
      <div>
        <input type="text" onInput={nameInput} placeholder="NFT name"></input>
      </div>
      <div>
        <Discription>Description</Discription>
        <DiscriptionDetail>
          The description will be inculded on the item's detail page underneath
          its NFT
        </DiscriptionDetail>
        <div>
          <DescriptionInput
            type="text"
            onInput={discriptionInput}
            placeholder="Provide a detailed description of your item."
          ></DescriptionInput>
        </div>
      </div>
      <CreateDiv>
        <CreateButton onClick={mint}>Create</CreateButton>
      </CreateDiv>
    </MintingBox>
  );
}

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
  width: 300px;
  padding: 10px;
  border-radius: 10px;
  border-color: white;
  background-color: rgba(176, 222, 219, 1);
  color: rgba(88, 49, 49, 1);
`;

const CreateDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const FileImg = styled.img`
  width: 250px;
`;

export default MintingComponent;
