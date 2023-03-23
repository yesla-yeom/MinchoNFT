import { useEffect, useState } from "react";
import axios from "axios";

import CollectionItemComponent from "./Component";

const CollectionItemContainer = ({ collectionArr, setCollection }) => {
  const [isOrder, setIsOrder] = useState(false);
  const [search, setSearch] = useState("");

  const findSearch = async (_search) => {
    const data = await axios.post(
      "http://localhost:8080/api/allToken/collectionList",
      { search: _search }
    );
    setCollection(data.data.list);
  };

  return (
    <CollectionItemComponent
      collectionArr={collectionArr}
      setSearch={setSearch}
      search={search}
      findSearch={findSearch}
    />
  );
};

export default CollectionItemContainer;
