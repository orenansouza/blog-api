import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }

  @Get('user/:userId')
  async getAllPostsByUserId(
    @Param('userId') userId: number,
  ): Promise<PostEntity[]> {
    return this.postService.getAllPostsByUserId(userId);
  }

  @Post()
  async createPost(@Body() postData: CreatePostDto): Promise<PostEntity> {
    return this.postService.createPost(postData);
  }

  @Delete(':postId')
  async deletePost(
    @Param('postId') postId: number,
  ): Promise<{ success: boolean }> {
    return this.postService.deletePost(postId);
  }
}
