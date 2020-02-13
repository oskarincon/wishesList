import { Component, Input, ViewChildren } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})

export class ListsComponent {
  @ViewChildren(IonList) listas: IonList;
  @Input() finished = true;
  constructor(public wishesService: WishesService,
               private router:Router,
               private AlertController:AlertController) {
   }

   selectedList(lista:List) {
     const tab = this.finished ? '2' : '1'; 
    this.router.navigateByUrl(`/tabs/tab${ tab }/add/${ lista.id }`);
  }

  deleteItem(item) {
    this.wishesService.deleteList(item);
  }

  async editItem(item) {
    const alert = await this.AlertController.create({
      header: 'edit List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: item.tittle,
          placeholder: 'list`s name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.listas.closeSlidingItems();
          }
        },
        {
          text: 'update',
          handler: (data) => {
            if (typeof data.title !== 'undefined' && data.title) {
              item.tittle = data.title;
              this.wishesService.saveStorage();
              this.listas.closeSlidingItems();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
