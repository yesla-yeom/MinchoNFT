import { useState } from "react";
import QnaComponent from "./Component";

const QnaContainer = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);

  return (
    <QnaComponent
      setCheck1={setCheck1}
      check1={check1}
      setCheck2={setCheck2}
      check2={check2}
      setCheck3={setCheck3}
      check3={check3}
      setCheck4={setCheck4}
      check4={check4}
      setCheck5={setCheck5}
      check5={check5}
      setCheck6={setCheck6}
      check6={check6}
    />
  );
};

export default QnaContainer;
