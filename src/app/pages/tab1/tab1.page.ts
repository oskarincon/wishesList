import { Component } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  list:List[] = [];
  constructor(public wishesService:WishesService,
              private router:Router,
              private alertController:AlertController) {
    this.list = this.wishesService.list;
  }

  async addList() {
    const alert = await this.alertController.create({
      header: 'New List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'list`s name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'create',
          handler: (data) => {
            if (typeof data.title !== 'undefined' && data.title) {
              const listId = this.wishesService.createList(data.title);
              this.router.navigateByUrl(`/tabs/tab1/add/${ listId }`);
            }
          }
        }
      ]
    });
    alert.present();
  }
}
