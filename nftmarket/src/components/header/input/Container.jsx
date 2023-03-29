import HeaderInputComponent from "./Component";
import { useNavigate } from "react-router-dom";

const HeaderInputContainer = () => {
  const navigate = useNavigate();

  return <HeaderInputComponent navigate={navigate} />;
};

export default HeaderInputContainer;
