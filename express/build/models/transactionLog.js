import { Model, DataTypes } from "sequelize";
export default class TransactionLog extends Model {
    static initModel(sequelize) {
        return TransactionLog.init({
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
            tokenId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            paranoid: false,
            modelName: "TransactionLog",
            tableName: "transactionLog",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate(db) { }
}
