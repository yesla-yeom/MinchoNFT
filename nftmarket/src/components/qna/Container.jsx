import { useState } from "react";
import QnaComponent from "./Component";

const QnaContainer = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  return (
    <QnaComponent
      setCheck2={setCheck2}
      check2={check2}
      setCheck1={setCheck1}
      check1={check1}
    />
  );
};

export default QnaContainer;
