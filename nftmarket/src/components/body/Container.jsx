import axios from "axios";
import { useEffect } from "react";

import BodyComponent from "./Component";

const BodyContainer = () => {
  const listUp = async () => {};

  useEffect(() => {
    listUp();
  }, []);
  return <BodyComponent />;
};

export default BodyContainer;
