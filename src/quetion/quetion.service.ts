import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './quetion.model';
import { CreateQuetionsDto } from './dto/create-quetion.dto';

@Injectable()
export class QuetionService {
    constructor(
        @InjectModel(Question)
        private quetionRepository: typeof Question
    ) { }

    async create(dto: CreateQuetionsDto) {
        try {

            const post = await this.quetionRepository.create({ ...dto });
            return post;
        } catch (error) {
            // Здесь можно обработать ошибку
            console.error("Ошибка при создании вопроса:", error);
            throw new InternalServerErrorException("Ошибка при создании вопроса");
        }
    }

    async getAllQuetions() {
        try {
            const quetions = await this.quetionRepository.findAll({ include: { all: true } });
            return quetions;
        } catch (error) {
            console.error("Ошибка при получении всех вопросов:", error);
            throw new InternalServerErrorException("Ошибка при получении всех вопросов");
        }
    }

    async deleteQuetion(id: number) {
        return this.quetionRepository.destroy({ where: { id } });
    }





}
