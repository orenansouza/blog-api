import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { Post } from 'src/post/post.entity';
import { PostModule } from 'src/post/post.module';
import { PostService } from 'src/post/post.service';
import { User } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment]),
    AuthModule,
    UsersModule,
    PostModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, UserService, PostService],
})
export class CommentModule {}
