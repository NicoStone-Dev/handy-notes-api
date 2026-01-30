import { Request, Response } from "express";
import { AuthenticationService } from "../services/AuthenticationService";

const authService = new AuthenticationService();

export const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password){
            throw new Error("AUTHENTICATION_FAILED");
        }

        const login = await authService.login(email, password);

        res.status(200).json({
            login,
        });
    } catch (err) {
        res.status(401).json({
            error_message: 'AUTHENTICATION_FAILED',
            error_type: err instanceof Error ? err.message : 'Unknown error'
        })
        console.log(err);
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const userCode = req.user?.userCode;
        const password = req.body.currentPassword;
        const newPassword = req.body.newPassword;

        if (!userCode) {
            return res.status(401).json({
                error_message: 'UNAUTHORIZED_ACTION'
            });
        }

        if (!(newPassword && password)) {
            return res.status(400).json({
                error_message: 'PASSWORD_REQUIRED'
            });
        }

        const updatedUser = await authService.passwordUpdate(userCode, password, newPassword);

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({
            error_message: 'UPDATE_FAILED',
            error_type: err instanceof Error ? err.message : 'Unknown error'
        })
        console.log(err);
    }
}