import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(128)
  name: string;

  @IsString()
  @MaxLength(512)
  description: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsString()
  @MaxLength(256)
  address: string;

  @IsString()
  logo: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
