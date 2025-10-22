import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.send(res.status(201).json(newUser))
    } catch (err) {
        res.status(500).json({
            error_message: 'Failed to create user',
            error_type: err
        })
        console.log(err)
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.listUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            error_message: 'Failed to fetch users',
            error_type: err
        })
        console.log(err)
    }
}


export const findUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);

        const user = await userService.findUserById(userId);
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({
            error_message: 'Fetch failed, user has not been found',
            error_type: err
        })
        console.log(err)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const dataUpdated = await userService.updateUserInfo(userId, req.body);

        res.status(200).json(dataUpdated);
    } catch (err) {
        res.status(404).json({
            error_message: 'Data update failed, user has not been found',
            error_type: err,
        })
        console.log(err)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const userDeleted = await userService.deleteUser(userId);

        res.status(200).json(userDeleted);
    } catch (err) {
        res.status(404).json({
            error_message: 'Deletion failed, user has not been found',
            error_type: err,
        })
        console.log(err)
    }
}

export const listUserTasks = async (req: Request, res: Response) => {
    
}