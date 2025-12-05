import { Task } from "./Task.js";

export class TaskItem {
    constructor(
        readonly id: number,
        private _description: string,
        private _checkedOut: boolean,
        private _owningTask: Task,
    ) { }

    get description() {
        return this._description
    }

    get checkedOut() {
        return this._checkedOut;
    }

    get owningTask() {
        return this._owningTask;
    }

    set description(description: string) {
        this._description = description;
    }

    set checkedOut(checks: boolean) {
        this.checkedOut = checks;
    }
}
