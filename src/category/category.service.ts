import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { FilesService } from 'src/files/files.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    
    constructor(
        @InjectModel(Category)
        private categoryRepository: typeof Category,
        private fileService: FilesService
    ) { }

    async create(dto: CreateCategoryDto, image: any) {
        try {
            const fileName = await this.fileService.createFile(image);
            const cateory = await this.categoryRepository.create({ ...dto, image: fileName });
            return cateory;
        } catch (error) {
            // Здесь можно обработать ошибку
            console.error("Ошибка при создании вопроса:", error);
            throw new InternalServerErrorException("Ошибка при создании вопроса");
        }
    }

    async getAllCategories() {
        try {
            const quetions = await this.categoryRepository.findAll({ include: { all: true } });
            return quetions;
        } catch (error) {
            console.error("Ошибка при получении всех вопросов:", error);
            throw new InternalServerErrorException("Ошибка при получении всех вопросов");
        }
    }

    async deleteCategory(id: number) {
        try {
            const deletedCount = await this.categoryRepository.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new NotFoundException(`Вопрос с id ${id} не найден`);
            }
            return { success: true };
        } catch (error) {
            console.error(`Ошибка при удалении вопроса с id ${id}:`, error);
            throw new InternalServerErrorException(`Ошибка при удалении вопроса с id ${id}`);
        }
    }

    async getCategoryById(id: string) {
        try {
            const quetion = await this.categoryRepository.findOne({ where: { id }, include: { all: true } });
            if (!quetion) {
                throw new NotFoundException(`Вопрос с id ${id} не найден`);
            }
            return quetion;
        } catch (error) {
            console.error(`Ошибка при получении вопроса с id ${id}:`, error);
            throw new InternalServerErrorException(`Ошибка при получении вопроса с id ${id}`);
        }
    }
}
