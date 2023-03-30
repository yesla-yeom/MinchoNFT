import { Model, DataTypes } from "sequelize";
export default class Likes extends Model {
    static initModel(sequelize) {
        return Likes.init({
            likeFrom: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            likeTokenId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            paranoid: false,
            modelName: "Likes",
            tableName: "likes",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate(db) { }
}
