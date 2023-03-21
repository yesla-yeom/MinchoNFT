import styled from "styled-components";

const QnaComponent = ({ check1, setCheck1, check2, setCheck2 }) => {
  return (
    <QnaBox>
      <div>
        <div>
          <div
            onClick={() => {
              setCheck1((state) => !state);
            }}
          >
            {check1 ? <span>👉</span> : <span>👇</span>}title1
          </div>
          <div>
            {check1 ? (
              <ul>
                <li>내용1</li>
                <li>내용2</li>
              </ul>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <div
            onClick={() => {
              setCheck2((state) => !state);
            }}
          >
            {check2 ? <span>👉</span> : <span>👇</span>}title2
          </div>
          <div>
            {check2 ? (
              <ul>
                <li>내용3</li>
                <li>내용4</li>
              </ul>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </QnaBox>
  );
};

export default QnaComponent;

const QnaBox = styled.div`
  width: 100%;
  & > div {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    & > div {
      width: 50%;
      cursor: pointer;
      &:last-child {
        padding: 0 0 0 3%;
      }
    }
  }
`;
