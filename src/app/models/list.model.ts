import { ListItem } from './list-item.model';
export class List {

    id: Number;
    tittle: String;
    createdIn: Date;
    finishedIn: Date;
    completed: Boolean;
    items:ListItem[];


    constructor(tittle: String, ) {
        this.tittle = tittle;
        this.createdIn = new Date;
        this.completed = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}