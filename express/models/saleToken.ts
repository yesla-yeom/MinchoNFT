import { Model, DataTypes, Sequelize } from "sequelize";

export default class SaleToken extends Model {
  public from!: string;
  public to!: string;
  public price!: number;
  public ca!: string;

  public static initModel(sequelize: Sequelize) {
    return SaleToken.init(
      {
        from: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        to: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        ca: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: "SaleToken",
        tableName: "saleToken",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  public static associate(db: any) {}
}
