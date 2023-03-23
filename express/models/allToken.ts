import { Model, DataTypes, Sequelize } from "sequelize";

export default class AllToken extends Model {
  public tokenId!: number;
  public CA!: string;
  public price!: number;
  public blockChain!: string;
  public tokenOwner!: string;
  public tokenBase!: string;
  public name!: string;
  public description!: string;
  public image!: string;
  public value!: number;

  public static initModel(sequelize: Sequelize) {
    return AllToken.init(
      {
        tokenId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          unique: true,
        },
        ca: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        blockChain: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        tokenOwner: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        tokenBase: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        value: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        tokenName: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        sale: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: "AllToken",
        tableName: "allToken",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  public static associate(db: any) {}
}
