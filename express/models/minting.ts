import { Model, DataTypes, Sequelize } from "sequelize";

export default class Minting extends Model {
  public tokenName!: string;
  public tokenId!: number;
  public name!: string;
  public description!: string;
  public imgIpfsHash!: string;
  public jsonIpfsHash!: string;
  public from!: string;
  public rank!: number;
  public tokenImgName!: string;

  public static initModel(sequelize: Sequelize) {
    return Minting.init(
      {
        blockChain: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        tokenName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        tokenId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        tokenImgName: {
          type: DataTypes.STRING(255),
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
        imgIpfsHash: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        jsonIpfsHash: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        from: {
          type: DataTypes.STRING(66),
          allowNull: false,
        },
        rank: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        price: {
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
