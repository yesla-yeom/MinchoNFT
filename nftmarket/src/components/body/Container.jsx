import axios from "axios";
import { useEffect } from "react";

import BodyComponent from "./Component";

const BodyContainer = () => {
  const listUp = async () => {
    const data = await axios.get("http://localhost:8080/api/allToken/list");
    console.log(data.data);
  };

  useEffect(() => {
    listUp();
  }, []);
  return <BodyComponent />;
};

export default BodyContainer;
