import { Component } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list.model';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  list: List;
  item: String = '';
  constructor(private wishesService:WishesService,
              private route:ActivatedRoute) {
      const listId = this.route.snapshot.paramMap.get('listId');
      this.list = this.wishesService.getList(listId);
   }

   addItem() {
      if (typeof this.item !== 'undefined' && this.item) {
          const listItem = new ListItem(this.item );
          this.list.items.push(listItem);
          this.item = '';
          this.wishesService.saveStorage();
      }
   }

   changedItem(item:ListItem) {
    const pendingItem = this.list.items.filter( itemData => !itemData.completed).length;
    if (pendingItem === 0) {
      this.list.finishedIn = new Date;
      this.list.completed = true;
    } else {
      this.list.finishedIn = null;
      this.list.completed = false;
    }
    this.wishesService.saveStorage();
   }

   deleteItem(i: number) {
     this.list.items.splice( i, 1);
     this.wishesService.saveStorage();
   }
}
