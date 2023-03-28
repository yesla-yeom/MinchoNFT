import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "../models/index";
import routes from "../routes/index";

// import pinataSDK from "@pinata/sdk";

// import dummyDataList from "../data/dummyData.json";
// import AllToken from "../models/allToken";

// const addData = async () => {
//   const pinata = new pinataSDK(
//     "4c64f4e382099ae14866",
//     "a7b9d3c02c40095d07400a5a82fb09c6b201d0259faf79bfe21d5f0f51b4dc7c"
//   );
//   let jsonResultArr = [];
//   let result = [];
//   for (let i = 0; i < dummyDataList.length; i++) {
//     const tempResult = await pinata.pinJSONToIPFS(dummyDataList[i], {
//       pinataMetadata: { name: Date.now().toString() + ".json" },
//       pinataOptions: { cidVersion: 0 },
//     });
//     jsonResultArr.push(tempResult);
//     result.push(
//       await AllToken.create({
//         tokenId: dummyDataList[i].tokenId,
//         name: dummyDataList[i].name,
//         description: dummyDataList[i].description,
//         image: dummyDataList[i].imgSrc,
//         ca: dummyDataList[i].CA,
//         price: dummyDataList[i].price,
//         blockChain: dummyDataList[i].blockChain,
//         tokenOwner: "0xc317B903788744922c227ab197A01444cEC742EE",
//         tokenStandard: dummyDataList[i].tokenStandard,
//         value: 1,
//         tokenName: "장정현토큰",
//         sale: 1,
//       })
//     );
//   }
// };

// addData();

const app: Express = express();

dotenv.config();

app.use("/upload", express.static("upload"));
app.use(cors({ origin: true, credential: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server Opened");
});
