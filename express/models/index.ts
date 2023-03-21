import { Sequelize } from "sequelize";
import Config from "../config/config.json";

import Minting from "./minting";

const env = process.env.NODE_ENV || "development";
const config = Config[env];
const db: any = { Minting };

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

db.Minting = Minting.initModel(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
