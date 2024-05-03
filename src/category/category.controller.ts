import { Body, Controller, Delete, Get, Inject, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { Category } from './category.model';

@ApiTags('categories')
@Controller('category')
export class CategoryController {


    constructor(private categoryService: CategoryService) { 

    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreateCategoryDto,
        @UploadedFile() image) {
        return this.categoryService.create(dto, image)
    }

    @Get()
    getAll() {
        return this.categoryService.getAllCategories()
    }

    @Get('/:id')
    async getQuetionById(@Param('id') id: string) {
        return this.categoryService.getCategoryById(id)
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return this.categoryService.deleteCategory(+id);
    }
}
