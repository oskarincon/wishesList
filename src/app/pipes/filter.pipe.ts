import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(list: List[], completed: boolean = true): List[] {
    return list.filter(lista => lista.completed === completed);
  }

}
