import { TaskItem } from "./TaskItem.js";

export class Task {
    constructor(
        public readonly id: number,
        public readonly taskCode: string,
        public readonly createdDate: Date,
        public title: String,
        private _items: TaskItem[] = [],
        private _taskedUserId: number,
    ) {
    }
}