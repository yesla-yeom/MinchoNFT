import { Model, DataTypes } from "sequelize";
export default class Token extends Model {
    static initModel(sequelize) {
        return Token.init({
            tokenId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            ca: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            price: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            blockChainNetwork: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            tokenOwner: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            tokenStandard: {
                type: DataTypes.STRING(45),
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
            tokenImage: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            saleState: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            tokenName: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            tokenAuthor: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            rank: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            likeCount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            paranoid: false,
            modelName: "Token",
            tableName: "token",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate(db) { }
}
