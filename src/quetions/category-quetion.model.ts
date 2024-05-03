import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, ForeignKey } from "sequelize-typescript";
import { Quetions } from "./quetions.model";
import { Category } from "src/category/category.model";




@Table({ tableName: 'category_quetions', createdAt: false, updatedAt: false })
export class CategoryQuetions extends Model<CategoryQuetions> {

    @ApiProperty({ example: "1", description: "уникальный идентификатор" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Quetions)
    @ApiProperty({ example: "---", description: "Значение" })
    @Column({ type: DataType.INTEGER })
    quetionId: number;

    @ForeignKey(() => Category)
    @ApiProperty({ example: "", description: "" })
    @Column({ type: DataType.INTEGER })
    categoryId: string;
}