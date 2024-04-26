import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsToMany, HasMany } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Quetions } from "src/quetions/quetions.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";


interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({ example: "1", description: "уникальный идентификатор" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "user@gmail.com", description: "почтовый адрес" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: "1234567", description: "пароль" })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;


    @ApiProperty({ example: "true", description: "забанен или нет" })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;


    @ApiProperty({ example: "за спам", description: "причина бана" })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[]

    @HasMany(() => Quetions)
    quetions: Quetions[]
}