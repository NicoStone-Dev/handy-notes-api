import { Request, Response } from "express";
import { UserRegisterService } from "../services/UserRegisterService.js";
import { UserProfileService } from "../services/UserProfileService.js";
import { AuthenticationService } from "../services/AuthenticationService.js";

// Pulling up the services
const userRegister = new UserRegisterService();
const userProfileService = new UserProfileService();
const authService = new AuthenticationService();

export const updateUsername = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                error_message: 'NOT_AUTHENTICATED'
            });
        }
        const newUsername = req.body.username;

        const updatedUser = await userProfileService.updateUsername(userId, newUsername);

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({
            error_message: 'UPDATE_FAILED',
            // Instead of leaving the whole stack trace which would be unsafe
            error_type: err instanceof Error ? err.message : 'Unknown error'
        })
        console.log(err);
    }
}

export const updateEmail = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                error_message: 'UNAUTHORIZED_ACTION'
            });
        }
        const newEmail = req.body.email;
        const updatedUser = await userProfileService.updateUserEmail(userId, newEmail);

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({
            error_message: 'UPDATE_FAILED',
            error_type: err instanceof Error ? err.message : 'Unknown error'
        })
        console.log(err);
    }
}

export const deleteUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                error_message: 'NOT_AUTHENTICATED'
            });
        }

        const deletedProfile = await userProfileService.deleteUserProfile(userId);

        res.status(200).json(deletedProfile)
    } catch (err) {
        res.status(400).json({
            error_message: 'UPDATE_FAILED',
            error_type: err instanceof Error ? err.message : 'Unknown error'
        })
        console.log(err);
    }
}

/*
    Creates user, expecting:
    email: string;
    username: string;
    password: string;
    From the req.body
*/
export const createUserProfile = async (req: Request, res: Response) => {
    try {
        const newUser = await authService.register(req.body);
        res.status(201).json(newUser.token);
    } catch (err) {
        res.status(500).json({
            error_message: 'FAILED_TO_CREATE_USER',
            error_type: err instanceof Error ? err.message : 'Unknown error'
        })
        console.log(err);
    }
}