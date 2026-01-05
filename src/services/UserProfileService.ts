import { prisma } from "../prisma";
import { UserRepository } from "./UserRepository";
import { UserUpdateDTO, UserCreationOutputDTO } from "../models/User";

const userRepo = new UserRepository();

export class UserProfileService {

    async updateUserEmail(id: number, newEmail: string): Promise<UserCreationOutputDTO> {
        try {
            await userRepo.findUserById(id);

            const updatedUser = prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    email: newEmail,
                }
            }
            )
            return updatedUser;
        } catch (error) {
            console.log(error);

            throw error;
        }
    }

    async updateUsername(id: number, newUsername: string): Promise<UserCreationOutputDTO> {
        try {
            await userRepo.findUserById(id);

            const updatedUser = prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    username: newUsername,
                }
            }
            )
            return updatedUser;
        } catch (error) {
            console.log(error);

            throw error;
        }
    }

    async deleteUserProfile(id: number): Promise<UserCreationOutputDTO> {
        try {
            await userRepo.findUserById(id);

            const deletion = await prisma.user.delete({
                where: {
                    id: id
                },
            })

            return deletion;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}