import HeaderLogoContainer from "./logo/Container";
import HeaderInputContainer from "./input/Container";
import HeaderEditContainer from "./edit/Container";

const HeaderComponent = ({ logIn }) => {
  return (
    <div>
      <HeaderLogoContainer />
      <HeaderInputContainer />
      <HeaderEditContainer logIn={logIn} />
    </div>
  );
};

export default HeaderComponent;
