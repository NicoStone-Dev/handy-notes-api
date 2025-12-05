import { User } from "./User.js";
import { TaskItem } from "./TaskItem.js";

export class Task {
    constructor(
        public readonly id: number,
        public readonly taskCode: string,
        public readonly createdAt: Date,
        private _taskStatus: TaskStatus,
        private _title: string,
        private _userTasked: User,
        items? : TaskItem[],
    ) {
    }
    public get title() {
        return this._title;
    }

    public get userTasked(){
        return this._userTasked;
    }

    public get taskStatus(){
        return this._taskStatus;
    }

    public get taskedUserCode() {
        return this._userTasked.userCode;
    }

    public set title(title: string) {
        this._title = title;
    }

    public set taskStatus(taskStatus: TaskStatus){
        this._taskStatus = taskStatus;
    }
}

export type TaskCreationDTO = {
    title: string,
    userTasked: User,
    taskedUserCode: string,
    
}

export type TaskReadDTO = {
    id: number,
    taskCode: string,
    createdAt: Date,
    title: string,
    items: string,
    taskStatus: TaskStatus,
    taskedUserCode: string
}

enum TaskStatus{
    IN_PROGRESS,
    COMPLETED,
    FAILED
}