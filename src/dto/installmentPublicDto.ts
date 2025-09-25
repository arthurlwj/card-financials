import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class InstallmentPublicDto {
  @ApiProperty({ example: 1 })
  @Expose()
  installmentNumber: number;

  @ApiProperty({ example: 100.50 })
  @Expose()
  installmentValue: number;

  @ApiProperty({ example: '2026-09-10' })
  @Expose()
  @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
  dueDay: string;
}
