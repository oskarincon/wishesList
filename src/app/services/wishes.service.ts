import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WishesService {
  list:List[] = [];
  constructor(public wishesService:WishesService,
              private alertController:AlertController) { 
    console.log('initialize service');
    this.loadStorage();
  }

  createList(title: String) {
    const lista = new List(title);
    this.list.push(lista);
    this.saveStorage();
    return lista.id;
  }

  getList( id: Number | String) {
    id = Number(id);
    return this.list.find( listData => listData.id === id );
  }

  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.list));
  }

  loadStorage() {
    this.list = !!localStorage.getItem('data') ? JSON.parse( localStorage.getItem('data')) : [];
  }

  deleteList(list :List) {
    this.list = this.list.filter(dataList => dataList.id !== list.id);
    this.saveStorage();
  }

  async editList(item) {
    const alert = await this.alertController.create({
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
          }
        },
        {
          text: 'update',
          handler: (data) => {
            if (typeof data.title !== 'undefined' && data.title) {
              item.tittle = data.title;
              this.saveStorage();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
