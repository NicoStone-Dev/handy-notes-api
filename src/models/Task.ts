import { User } from "./User.js";
import { TaskItem } from "./TaskItem.js";
// Importing from the prismma enum already configured is best than making my own :)
import { TaskStatus } from "../generated/client/enums.js";

export class Task {
    constructor(
        public readonly id: number,
        public readonly taskCode: string,
        public readonly createdAt: Date,
        private _taskStatus: TaskStatus,
        private _title: string,
        private _taskedUser: User,
        items?: TaskItem[],
    ) {
    }
    public get title() {
        return this._title;
    }

    public get taskedUser() {
        return this._taskedUser;
    }

    public get taskStatus() {
        return this._taskStatus;
    }

    public get taskedUserCode() {
        return this._taskedUser.userCode;
    }

    public set title(title: string) {
        this._title = title;
    }

    public set taskStatus(taskStatus: TaskStatus) {
        this._taskStatus = taskStatus;
    }
}

export type TaskCreationDTO = {
    title: string,
    items?: TaskItem[],
}

export type TaskUpdateDTO = {
    title: string,
    taskedUser: User,
    items?: TaskItem[],
}

export type TaskReadDTO = {
    id: number,
    taskCode: string,
    createdAt: Date,
    title: string,
    taskStatus: TaskStatus,
    items?: TaskItem[],
}