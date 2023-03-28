import { Sequelize } from "sequelize";
import Config from "../config/config.json";

import TransactionLog from "./transactionLog";
import Token from "./token";
import Likes from "./likes";

const env = process.env.NODE_ENV || "development";
const config = Config[env];
const db: any = { Token, TransactionLog, Likes };

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

db.TransactionLog = TransactionLog.initModel(sequelize);
db.Token = Token.initModel(sequelize);
db.Likes = Likes.initModel(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
