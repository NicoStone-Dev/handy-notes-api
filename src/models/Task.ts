import { Item } from "./Item.js";

export class Task {
    private _id: number;
    private _taskName: String;
    public _items: Item[] = [];

    constructor(id: number, taskName: String) {
        this._id = id;
        this._taskName = taskName;
    }

    public get id(): number {
        return this.id;
    }

    public get taskName(): String {
        return this.taskName;
    }

    public set taskName(newTaskName: String){
        this._taskName = newTaskName;
    }
}

// This is the ts way of creating a dto interface like thingy
export type TaskCreationDTO = {
    taskName: String,
    items: Item[]
}