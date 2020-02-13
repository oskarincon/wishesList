export class ListItem {
    desc: String;
    completed: Boolean;

    constructor(desc:String) {
        this.desc= desc;
        this.completed=false;
    }
}