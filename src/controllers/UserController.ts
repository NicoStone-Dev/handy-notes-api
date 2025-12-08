import { Request, Response } from "express";
import { UserRepository } from "../services/UserRepository.js";

const userRepository = new UserRepository();

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const dataUpdated = await userRepository.updateUserInfo(userId, req.body);

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
        const userDeleted = await userRepository.deleteUser(userId);

        res.status(200).json(userDeleted);
    } catch (err) {
        res.status(404).json({
            error_message: 'Deletion failed, user has not been found',
            error_type: err,
        })
        console.log(err)
    }
}