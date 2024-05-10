import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quetions } from './quetions.model';
import { FilesService } from 'src/files/files.service';
import { CreateQuetionsDto } from './dto/create-quetions.dto';
@Injectable()
export class QuetionsService {

    constructor(
        @InjectModel(Quetions)
        private quetionRepository: typeof Quetions,
        private fileService: FilesService
    ) { }

    async create(dto: CreateQuetionsDto, image: any) {
        try {
            const fileName = await this.fileService.createFile(image);
            const post = await this.quetionRepository.create({ ...dto, image: fileName });
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
        try {
            const deletedCount = await this.quetionRepository.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new NotFoundException(`Вопрос с id ${id} не найден`);
            }
            return { success: true };
        } catch (error) {
            console.error(`Ошибка при удалении вопроса с id ${id}:`, error);
            throw new InternalServerErrorException(`Ошибка при удалении вопроса с id ${id}`);
        }
    }

    async getQuetionById(id: string) {
        try {
            const quetion = await this.quetionRepository.findOne({ where: { id }, include: { all: true } });
            if (!quetion) {
                throw new NotFoundException(`Вопрос с id ${id} не найден`);
            }
            return quetion;
        } catch (error) {
            console.error(`Ошибка при получении вопроса с id ${id}:`, error);
            throw new InternalServerErrorException(`Ошибка при получении вопроса с id ${id}`);
        }
    }

    async updateQuetion(id: string, dto: CreateQuetionsDto): Promise<Quetions> {
        const question = await this.quetionRepository.findByPk(id); // Using findByPk to find by primary key
        if (!question) {
            throw new NotFoundException('Question not found');
        }
        // Update the properties of the question entity
        question.title = dto.title;
        question.description = dto.description;
        // Save the updated question entity
        try {
            await question.save(); // Save the updated question
            return question;
        } catch (error) {
            console.error(`Error updating question with id ${id}:`, error);
            throw new InternalServerErrorException(`Error updating question with id ${id}`);
        }
    }
}
