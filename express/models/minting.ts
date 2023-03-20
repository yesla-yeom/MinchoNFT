import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "minting",
})
export class Minting extends Model<Minting> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;
}

export default Minting;
