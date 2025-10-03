import { Task } from "./Task.js";

export class Item {
    constructor(
        public id: number,
        public description: String,
        public checkedOut: Boolean,
        public task: Task
    ) { }
}

export type ItemCreationDTO= {
    description: String,
    checkedOut: Boolean,
    task?: Task,
}