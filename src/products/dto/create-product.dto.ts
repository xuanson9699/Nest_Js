import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric } from 'class-validator';

export class CreateProductDto {
  id: number;

  @ApiProperty()
  @IsAlphanumeric()
  title: string;
  description: string;
  price: number;
}
