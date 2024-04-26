import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, ForeignKey } from "sequelize-typescript";
import { Quetions } from "src/quetions/quetions.model";
import { Category } from "./category.model";




@Table({ tableName: 'category_quetions', createdAt: false, updatedAt: false })
export class UserQuetions extends Model<UserQuetions> {

    @ApiProperty({ example: "1", description: "уникальный идентификатор" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Quetions)
    @ApiProperty({ example: "ADMIN", description: "Значение роли" })
    @Column({ type: DataType.INTEGER })
    quetionId: number;

    @ForeignKey(() => Category)
    @ApiProperty({ example: "Администратор", description: "описание роли" })
    @Column({ type: DataType.INTEGER })
    categoryId: number;

}