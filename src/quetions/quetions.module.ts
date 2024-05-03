import { Module } from '@nestjs/common';
import { QuetionsService } from './quetions.service';
import { QuetionsController } from './quetions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quetions } from './quetions.model';
import { Question } from '../quetion/quetion.model';
import { Category } from 'src/category/category.model';
import { UserQuetions } from './user-quetions.model';
import { FilesService } from 'src/files/files.service';
import { CategoryQuetions } from './category-quetion.model';

@Module({
  providers: [QuetionsService, FilesService],
  controllers: [QuetionsController],
  imports: [
    SequelizeModule.forFeature([Quetions, Question, Category, UserQuetions, CategoryQuetions]),
  ],
  exports: [QuetionsService]
})
export class QuetionsModule { }
