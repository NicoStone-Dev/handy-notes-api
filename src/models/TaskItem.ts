import { Task } from "./Task.js";

export class TaskItem {
    constructor(
        readonly id: number,
        readonly createdAt: Date,
        private _description: string,
        private _completion: boolean,
        private _owningTask: Task,
    ) { }

    get description() {
        return this._description
    }

    get completion() {
        return this._completion;
    }

    get owningTask() {
        return this._owningTask;
    }

    set description(description: string) {
        this._description = description;
    }

    set completion(checks: boolean) {
        this.completion = checks;
    }
}

export type TaskItemDTO =
    {
        description: string,
        completion: boolean,
        id: number,
        owningTaskId: number
    }