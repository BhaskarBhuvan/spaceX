import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'queryParamsFormater'
})
export class QueryParamsFormaterPipe implements PipeTransform {

  transform(value: string|boolean, key: string): unknown {
    const paramObj = {
      [key]: value
    }
    return paramObj;
  }

}
