import { IsNumber, IsString, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsNumber()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly profileImagePath?: string;
}
