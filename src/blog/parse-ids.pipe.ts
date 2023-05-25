import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ParseIdsPipe implements PipeTransform<string, number[]> {
  transform(value: string, metadata: ArgumentMetadata): number[] {
    if (!value) return [];
    return value.split(',').map((value) => +value);
  }
}
