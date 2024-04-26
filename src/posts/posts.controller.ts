import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Посты ')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto,
        @UploadedFile() image) {
        return this.postService.create(dto, image)
    }

    @Get()
    getAll() {
        return this.postService.getAllPosts()
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return this.postService.deletePost(+id);
    }

}
