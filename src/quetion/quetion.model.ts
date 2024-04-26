import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Category } from "src/category/category.model";
import { Quetions } from "../quetions/quetions.model";


interface QuestionCreationAttrs {
    question: string;
    options: string[];
    correctAnswer: string;
}

@Table({ tableName: 'quetion' })
export class Question extends Model<Question, QuestionCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "What is the capital of France?", description: "Вопрос" })
    @Column({ type: DataType.STRING, allowNull: false })
    question: string;

    @ApiProperty({ type: [String], example: ["Paris", "London", "Berlin", "Rome"], description: "Варианты ответов" })
    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
    options: string[];

    @ApiProperty({ example: "Paris", description: "Правильный ответ" })
    @Column({ type: DataType.STRING, allowNull: false })
    correctAnswer: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;

    @ForeignKey(() => Quetions) // Указание внешнего ключа для отношения с моделью Quetions
    @Column({ type: DataType.INTEGER }) // тип должен совпадать с типом идентификатора модели Quetions
    quetionId: number; // Поле для хранения внешнего ключа

}
