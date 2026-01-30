import { prisma } from "../prisma";
import { UserRepository } from "./repos/UserRepository";
import { UserCreationOutputDTO } from "../models/User";

const userRepo = new UserRepository();

export class UserProfileService {

    /*  
        Prisma has an error of code P2002 which is the universal "Stop! Duplicate found"
        It is a must for such errors to be interpreted and thrown in ANY operation 
        which sets unique variables, it's own error class must be built! 
    */
    async updateUserEmail(id: number, newEmail: string): Promise<UserCreationOutputDTO> {
        try {
            await userRepo.findUserById(id);

            const updatedUser = await prisma.user.update({
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

    // Should implement regex rules for username through creation and update
    async updateUsername(id: number, newUsername: string): Promise<UserCreationOutputDTO> {
        try {
            await userRepo.findUserById(id);

            const updatedUser = await prisma.user.update({
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