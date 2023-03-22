import { Model, DataTypes, Sequelize } from "sequelize";

export default class Minting extends Model {
  public tokenId!: number;
  public name!: string;
  public description!: string;
  public imgIpfsHash!: string;
  public jsonIpfsHash!: string;
  public from!: string;
  public rank!: number;

  public static initModel(sequelize: Sequelize) {
    return Minting.init(
      {
        tokenId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        imgipfshash: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        jsonipfshash: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        from: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        rank: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: "Minting",
        tableName: "minting",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  public static associate(db: any) {}
}
