import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from '../comment/comment.entity';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { content, userId } = createPostDto;
    const newPost = this.postRepository.create({
      content,
      user: { id: userId },
    });

    return this.postRepository.save(newPost);
  }

  async getAllPostsByUserId(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async getOnePostsById(postId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { id: postId },
    });
  }

  async deletePost(postId: number): Promise<{ success: boolean }> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['comments'],
    });

    if (!post) {
      throw new HttpException(
        `Post com ID ${postId} não encontrado!`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await this.commentRepository.remove(post.comments);

      await this.postRepository.remove(post);

      return { success: true };
    } catch (error) {
      throw new HttpException(
        `Falha ao tentar apagar o post ${postId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
