import { useEffect, useState } from "react";
import CollectionItemComponent from "./Component";

const CollectionItemContainer = ({ collectionArr, setCollection }) => {
  const [isOrder, setIsOrder] = useState(false);
  const [search, setSearch] = useState("");

  const findSearch = (_search) => {
    console.log(_search);
    let tempArr = [];
    collectionArr.forEach((item) => {
      if (item.name.includes(_search)) {
        console.log(item.name);
        console.log(_search);
        console.log(item.name.includes(_search));
        console.log([item]);
        tempArr.push(item);
      }
    });
    console.log(tempArr);
    setCollection(tempArr);
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
