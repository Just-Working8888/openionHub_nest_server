import { Injectable } from '@nestjs/common';
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { FilesService } from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post)
        private postRepository: typeof Post,
        private fileService: FilesService
    ) { }

    async create(dto: CreatePostDto, image: any) {
        try {
            const fileName = await this.fileService.createFile(image);
            const post = await this.postRepository.create({ ...dto, image: fileName })
            return post;
        } catch (error) {
            return error
        }
    }
    async getAllPosts() {
        const posts = await this.postRepository.findAll({ include: { all: true } })
        return posts
    }
    async deletePost(id: number) {
        return this.postRepository.destroy({ where: { id } });
    }

}
