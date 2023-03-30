import { Sequelize } from "sequelize";
import Config from "../config/config.js";
import TransactionLog from "./transactionLog.js";
import Token from "./token.js";
import Likes from "./likes.js";
const env = process.env.NODE_ENV || "development";
const config = Config[env];
const db = { Token, TransactionLog, Likes };
let sequelize = new Sequelize(
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
