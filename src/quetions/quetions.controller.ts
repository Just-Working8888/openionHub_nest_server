import { FileInterceptor } from '@nestjs/platform-express';
import { QuetionsService } from './quetions.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateQuetionsDto } from './dto/create-quetions.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quetions ')
@Controller('quetions')
export class QuetionsController {

    constructor(private quetionsService: QuetionsService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreateQuetionsDto,
        @UploadedFile() image) {
        return this.quetionsService.create(dto, image)
    }

    @Get()
    getAll() {
        return this.quetionsService.getAllQuetions()
    }

    @Get('/:id')
    async getQuetionById(@Param('id') id: string) {
        return this.quetionsService.getQuetionById(id)
    }
    
    @Patch('/:id') // Define PATCH method route
    async updateQuetion(@Param('id') id: string, @Body() dto: CreateQuetionsDto) { // Accept parameters
        return this.quetionsService.updateQuetion(id, dto); // Delegate to service
    }


    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return this.quetionsService.deleteQuetion(+id);
    }
}
