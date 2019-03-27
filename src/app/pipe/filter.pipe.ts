import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    console.log(searchText);
    let searchText1 = searchText.toLowerCase();
    return items.filter( it => {
      return it.Task.toLowerCase().includes(searchText1);
    });
  }
}