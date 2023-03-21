import HeaderLogoContainer from "./logo/Container";
import HeaderInputContainer from "./input/Container";
import HeaderEditContainer from "./edit/Container";

const HeaderComponent = () => {
  return (
    <div>
      <HeaderLogoContainer />
      <HeaderInputContainer />
      <HeaderEditContainer />
    </div>
  );
};

export default HeaderComponent;
