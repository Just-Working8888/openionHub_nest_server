import { Module } from '@nestjs/common';
import { QuetionController } from './quetion.controller';
import { QuetionService } from './quetion.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quetions } from 'src/quetions/quetions.model';
import { Question } from './quetion.model';
import { Category } from 'src/category/category.model';
import { UserQuetions } from 'src/quetions/user-quetions.model';

@Module({
  controllers: [QuetionController],
  providers: [QuetionService],
  imports: [
    SequelizeModule.forFeature([Quetions, Question, Category, UserQuetions]),
  ],
})
export class QuetionModule { }
