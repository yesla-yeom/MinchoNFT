import { Sequelize } from "sequelize";
import Config from "../config/config.json";

import BuyToken from "./buyToken";
import AllToken from "./allToken";
import Minting from "./minting";

const env = process.env.NODE_ENV || "development";
const config = Config[env];
const db: any = { BuyToken, Minting, AllToken };

let sequelize: any = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.BuyToken = BuyToken.initModel(sequelize);
db.Minting = Minting.initModel(sequelize);
db.AllToken = AllToken.initModel(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
