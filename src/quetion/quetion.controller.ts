import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { QuetionService } from './quetion.service';
import { CreateQuetionsDto } from './dto/create-quetion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quetion')
@Controller('quetion')
export class QuetionController {

    constructor(private quetionsService: QuetionService) { }

    @Post()
    createPost(@Body() dto: CreateQuetionsDto) {
        return this.quetionsService.create(dto)
    }

    @Get()
    getAll() {
        return this.quetionsService.getAllQuetions()
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return this.quetionsService.deleteQuetion(+id);
    }
}
