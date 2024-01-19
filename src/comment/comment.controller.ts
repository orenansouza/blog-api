import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';

import { CommentService } from './comment.service';
import { Comment as CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: number,
  ): Promise<CommentEntity> {
    return this.commentService.createComment(createCommentDto, Number(postId));
  }

  @Get(':postId')
  async getCommentsByPostId(
    @Param('postId') postId: number,
  ): Promise<CommentEntity[]> {
    return this.commentService.getCommentsByPostId(postId);
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: number): Promise<void> {
    return this.commentService.deleteComment(commentId);
  }
}
