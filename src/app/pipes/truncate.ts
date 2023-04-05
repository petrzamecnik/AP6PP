import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined, maxLength: number): string {
    if (value && value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    } else {
      return value || '';
    }
  }
}
