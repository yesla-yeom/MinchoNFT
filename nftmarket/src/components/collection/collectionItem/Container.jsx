import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import CollectionItemComponent from "./Component";

const CollectionItemContainer = ({
  collectionArr,
  setCollection,
  order,
  setOrder,
  collectionInfo,
  check,
  setCheck,
}) => {
  const [search, setSearch] = useState("");
  const [notFount, setNotFount] = useState("");
  const params = useParams();

  const findSearch = async (_search, _order) => {
    const data = await axios.post(
      "http://localhost:8080/api/allToken/collectionList",
      { search: _search, order: _order, tokenName: params.tokenName }
    );
    if (data.data.status == 401) setCheck(true);
    setCollection(data.data.list);
  };

  return (
    <CollectionItemComponent
      collectionArr={collectionArr}
      setSearch={setSearch}
      search={search}
      findSearch={findSearch}
      order={order}
      setOrder={setOrder}
      check={check}
      setCheck={setCheck}
      collectionInfo={collectionInfo}
      notFount={notFount}
      setNotFount={setNotFount}
    />
  );
};

export default CollectionItemContainer;
