import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Question } from "../quetion/quetion.model";
import { User } from "src/users/users.model";
import { Category } from "src/category/category.model";

interface QuetionsCreationAttrs {
    title: string;
    image: string;
    description: string
    questions: Question[]
}

@Table({ tableName: 'quetions' })
export class Quetions extends Model<Quetions, QuetionsCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    description: string;

    @Column({ type: DataType.STRING })
    image: string;

    @HasMany(() => Question)
    questions: Question[];

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryId: number;
    // description

    @BelongsTo(() => Category)
    category: Category;
    @BelongsTo(() => User) // Определение отношения с моделью User
    user: User; // Поле для связи с моделью User

    @ForeignKey(() => User) // Указание внешнего ключа для отношения с моделью User
    @Column({ type: DataType.INTEGER }) // тип должен совпадать с типом идентификатора модели User
    userId: number; // Поле для хранения внешнего ключа


}
