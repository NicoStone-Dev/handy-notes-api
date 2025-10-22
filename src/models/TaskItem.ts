import { Task } from "./Task.js";

export class TaskItem {
    constructor(
        public id: number,
        public description: string,
        public checkedOut: Boolean,
        public task: Task
    ) {}
}