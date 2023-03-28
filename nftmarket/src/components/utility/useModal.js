import styled from "styled-components";
import { Button } from "antd";

const useModal = (content, state, modalStat, setBoolenstat) => {
  console.log(state, "나는 받고있는 거래 상태임");

  return (modalStat && state == "WAITING") ||
    (modalStat && state == "SUCCESS") ? (
    <MyModalMask>
      <MyModalLine>
        <div>
          <h1>{content} 작업 중</h1>
        </div>
        <div>
          <h3>현재 작업이 준비중입니다 조금 기다려주세요</h3>
        </div>
        <div>
          {state == "SUCCESS" ? (
            <EditButton
              onClick={() => {
                setBoolenstat(!state);
              }}
            >
              확인
            </EditButton>
          ) : (
            <EditButton loading>{content}</EditButton>
          )}
        </div>
      </MyModalLine>
    </MyModalMask>
  ) : (
    <></>
  );
};

const MyModalMask = styled.div`
  position: fixed;
  top: 0;
  inset-inline-end: 0;
  bottom: 0;
  inset-inline-start: 0;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.45);
`;

const MyModalLine = styled.div`
  margin: 0 auto;
  position: relative;
  top: 100px;
  width: 400px;
  height: 180px;
  background-color: rgb(227, 243, 247);
  padding: 20px 24px;
  border-radius: 8px;
  & > div {
    padding: 10px 0;
  }
  & > div:nth-child(3) {
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;
  }
  & > div > button {
    background-color: rgb(252, 110, 94);
  }
  & > div > button:hover {
    background-color: rgb(252, 110, 94) !important;
    color: black !important;
  }
`;
const EditButton = styled(Button)`
  font-weight: 700;
`;

export default useModal;
