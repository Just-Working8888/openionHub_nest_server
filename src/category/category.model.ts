import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Question } from "src/quetion/quetion.model";


interface CategoryCreationAttrs {
    title: string;
    image: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {

    @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: "Geography", description: "Название категории" })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({ example: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-75qSBNjrnHdEIXWBlf68q5XJp0apsxKktHhqbB_g_A&s", description: "Ссылка на изображение" })
    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

    @HasMany(() => Question)
    questions: Question[];
}
