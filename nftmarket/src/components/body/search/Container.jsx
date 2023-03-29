import { useLocation } from "react-router-dom";
import SearchComponent from "./Component";
import qs from "qs";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchContainer = () => {
  const [tokenArr, setTokenArr] = useState("");
  const location = useLocation();

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const findNFT = async () => {
    const searchValue = await axios.post(
      "http://localhost:8080/api/sortToken/searchName",
      query
    );
    setTokenArr(searchValue.data);
  };
  useEffect(() => {
    findNFT();
  }, [location]);

  return <SearchComponent tokenArr={tokenArr} />;
};

export default SearchContainer;
