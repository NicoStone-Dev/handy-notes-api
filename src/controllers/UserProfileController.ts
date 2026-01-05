import { Request, Response } from "express";
import { UserRepository } from "../services/UserRepository.js";
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
            error_mesage: 'UPDATE_FAILED',
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
                error_message: 'NOT_AUTHENTICATED'
            });
        }
        const newEmail = req.body.email;

        const updatedUser = await userProfileService.updateUserEmail(userId, newEmail);

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({
            error_mesage: 'UPDATE_FAILED',
            error_type: err instanceof Error ? err.message : 'Unknown error'
        })
        console.log(err);
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const email = req.user?.email;
        const password = req.body.currentPassword;
        const newPassword = req.body.newPassword;

        if (!email) {
            return res.status(401).json({
                error_message: 'NOT_AUTHENTICATED'
            });
        }

        if (!(newPassword && password)) {
            return res.status(400).json({
                error_message: 'PASSWORD_REQUIRED'
            });
        }

        const updatedUser = await authService.passwordUpdate(email, password, newPassword);

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({
            error_mesage: 'UPDATE_FAILED',
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
            error_mesage: 'UPDATE_FAILED',
            error_type: err instanceof Error ? err.message : 'Unknown error'
        })
        console.log(err);
    }
}

export const createUserProfile = async (req: Request, res: Response) => {
    try {
        const newUser = await userRegister.registerUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({
            error_message: 'FAILED_TO_CREATE_USER',
            error_type: err instanceof Error ? err.message : 'Unknown error'
        })
        console.log(err);
    }
}