import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quetions } from 'src/quetions/quetions.model';
import { Category } from './category.model';
import { FilesModule } from 'src/files/files.module';

@Module({
    providers: [CategoryService],
    controllers: [CategoryController],
    imports: [
        SequelizeModule.forFeature([Quetions, Category]),
        FilesModule
    ],
})
export class CategoryModule { }
