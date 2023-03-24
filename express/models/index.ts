import { Sequelize } from "sequelize";
import Config from "../config/config.json";

import SaleToken from "./saleToken";
import Token from "./token";

const env = process.env.NODE_ENV || "development";
const config = Config[env];
const db: any = { Token, SaleToken };

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

db.SaleToken = SaleToken.initModel(sequelize);
db.Token = Token.initModel(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
