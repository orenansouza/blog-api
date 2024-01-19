import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { UserService } from 'src/users/users.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    postId: number,
  ): Promise<Comment> {
    const user = await this.userService.findOneById(createCommentDto.userId);

    if (!user) {
      throw new HttpException(
        'Usuário informado não existe!',
        HttpStatus.NOT_FOUND,
      );
    }

    const post = await this.postService.getOnePostsById(postId);

    if (!post) {
      throw new HttpException(
        'Post informado não existe!',
        HttpStatus.NOT_FOUND,
      );
    }

    const newComment = this.commentRepository.create({
      content: createCommentDto.content,
      post: { id: postId },
      user: { id: createCommentDto.userId },
    });

    return this.commentRepository.save(newComment);
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['post', 'user'],
    });
  }

  async deleteComment(commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new HttpException(
        `Comentário com ID ${commentId} não encontrado!`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.commentRepository.remove(comment);
  }
}
