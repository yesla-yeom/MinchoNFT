import HeaderEditComponent from "./Component";

const HeaderEditContainer = ({ logIn }) => {
  const handleCopy = async (_text) => {
    await navigator.clipboard.writeText(_text);
  };
  return <HeaderEditComponent logIn={logIn} handleCopy={handleCopy} />;
};

export default HeaderEditContainer;
