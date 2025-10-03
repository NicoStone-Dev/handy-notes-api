import { Request, Response } from "express";
import { taskService } from "../services/TaskService.js";


export const getAllTasks = async (request: Request, response: Response): Promise<void> => {
    try {

        const tasks = await taskService.listAll();
        response.send(response.status(200).json(tasks));
    } catch (error) {
        response.status(500).json({
            message: "Error fetching tasks"
        })
    }
}

export const getTaskById = async (request: Request, response: Response): Promise<void> => {
    try {

        let id;

        if(request.params.id){
            id = parseInt(request.params.id, 10);
        }

        if (id && isNaN(id)) {
            response.status(500).json({
                message: "Error fetching  task: Paramether is not a number"
            })
        }

        let task;

        if(id){
            task = await taskService.findById(id);
        }

        if(task) {
            response.status(200).json(task);
        } else {
            response.status(404).json({
            message : "Error fetching task: Task was not found"
        })
        }

    } catch (error) {
        response.status(500).json({
            message: "Error fetching task"
        })
    }
}