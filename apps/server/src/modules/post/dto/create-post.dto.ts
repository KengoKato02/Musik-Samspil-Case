import { IsString, IsNotEmpty, IsEnum, IsUrl } from "class-validator";
import { PostType } from "../../../utils/types/enums";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  ensemble_id!: string;

  @IsString()
  @IsNotEmpty()
  author_id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsUrl()
  @IsNotEmpty()
  website_url!: string;

  @IsEnum(PostType)
  @IsNotEmpty()
  type!: PostType;
}
