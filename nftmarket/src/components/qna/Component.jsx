import styled from "styled-components";

const QnaComponent = ({
  check1,
  setCheck1,
  check2,
  setCheck2,
  check3,
  setCheck3,
  check4,
  setCheck4,
  check5,
  setCheck5,
  check6,
  setCheck6,
}) => {
  return (
    <QnaBox>
      <img
        src="./imgs/howtouse.png"
        alt=""
        style={{ marginBottom: "5%" }}
      ></img>
      <QnaFrame>
        <div>
          <div className="qnaGrid">
            <div
              onClick={() => {
                setCheck1((state) => !state);
              }}
            >
              {check1 ? <span>👇</span> : <span>👉</span>}NFT가 무엇인가요?
            </div>
            <div className="answerGrid">
              {check1 ? (
                <ul>
                  <li>
                    NFT는 대체불가능토큰(Non-fungible token, NFT)으로, 블록체인
                    기술을 이용해 디지털 자산의 소유주를 증명하는 가상의
                    토큰(token)이에요. 그림, 영상 등의 디지털 파일을 가리키는
                    주소를 토큰 안에 담아 그 고유한 원본성 및 소유권을 나타내는
                    용도로 사용됩니다.
                  </li>
                  <li>
                    한마디로 쉽게 요약하자면, 암호화폐가 블록체인을 이용해서
                    만든 돈이라면 NFT는 블록체인을 이용해 만든 증명서입니다.
                  </li>
                </ul>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="qnaGrid">
            <div
              onClick={() => {
                setCheck2((state) => !state);
              }}
            >
              {check2 ? <span>👇</span> : <span>👉</span>}민초 Mintcho
              이용방법에 대해 알고 싶어요.
            </div>
            <div className="answerGrid">
              {check2 ? (
                <ul>
                  <li>
                    현재 이더리움 NFT에 대한 자유로운 거래를 지원합니다.
                    PC-모바일 모두 거래할 수 있으며, NFT 프로젝트의 스마트
                    컨트랙트를 검증 받은 NFT만 입점합니다. 이더리움 NFT
                    프로젝트의 주거래통화는 ETH입니다.
                  </li>
                </ul>
              ) : (
                <></>
              )}
            </div>

            <div className="qnaGrid">
              <div
                onClick={() => {
                  setCheck3((state) => !state);
                }}
              >
                {check3 ? <span>👇</span> : <span>👉</span>}민초 NFT마켓
                거래수수료에 대해 알고 싶어요.
              </div>
              <div className="answerGrid">
                {check3 ? (
                  <ul>
                    <li>
                      현재 민초에서는 최저 수수료 모델을 기반으로 하는 창작자
                      로열티(수수료) 정책을 진행하고 있습니다. 최저 수수료
                      모델이란 NFT 컨트랙트 모니터링을 통해 가장 낮은 수수료로
                      적용되는 것을 의미합니다.
                    </li>
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="qnaGrid">
              <div
                onClick={() => {
                  setCheck4((state) => !state);
                }}
              >
                {check4 ? <span>👇</span> : <span>👉</span>}NFT를 판매했는데
                ETH가 들어오지 않아요.
              </div>
              <div className="answerGrid">
                {check4 ? (
                  <ul>
                    <li>민초에 지갑을 연결 후 ETH 잔액을 확인해주세요.</li>
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="qnaGrid">
              <div
                onClick={() => {
                  setCheck5((state) => !state);
                }}
              >
                {check5 ? <span>👇</span> : <span>👉</span>}가격 제안 현황은
                어디에서 확인하나요?
              </div>
              <div className="answerGrid">
                {check5 ? (
                  <ul>
                    <li>MY NFT 페이지에서 확인해주세요.</li>
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="qnaGrid">
              <div
                onClick={() => {
                  setCheck6((state) => !state);
                }}
              >
                {check6 ? <span>👇</span> : <span>👉</span>}거래내역은 어디서
                확인할 수 있나요?
              </div>
              <div className="answerGrid">
                {check6 ? (
                  <ul>
                    <li>
                      해당 NFT 프로젝트 페이지에서 거래내역을 확인할 수
                      있습니다. 내 거래내역은 지갑을 연결한 후, 민초 MY NFT
                      페이지에서 확인할 수 있습니다.
                    </li>
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </QnaFrame>
    </QnaBox>
  );
};

export default QnaComponent;

const QnaBox = styled.div`
  text-align: center;

  & .answerGrid {
    display: grid;
    padding-bottom: 30px;
    font-weight: 500;
  }

  li {
    list-style: none;
  }
`;

const QnaFrame = styled.div`
  text-align: center;
  font-weight: 700;
`;
