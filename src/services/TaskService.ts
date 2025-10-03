import { Task } from "../models/Task.js";


const tasksList : Task[] = [
    new Task(1, "House Cleaning"),
    new Task(2, "Computer Stuff")
]

export const taskService = {

    listAll : async():  Promise<Task[]> => {
        return Promise.resolve(tasksList);
    },

    findById: async(id: number): Promise<Task | null> => {

        const task = tasksList.find(task => task.id === id);

        return Promise.resolve(task || null);
    }
}