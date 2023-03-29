import HeaderInputComponent from "./Component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderInputContainer = () => {
  const navigate = useNavigate();

  return <HeaderInputComponent navigate={navigate} />;
};

export default HeaderInputContainer;
