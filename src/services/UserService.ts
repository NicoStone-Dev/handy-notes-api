import { UserCreationInputDTO, UserReadDTO, UserCreationOutputDTO, userUpdateDTO, User } from '../models/User.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient;

export class UserService {

    async createUser(userData: UserCreationInputDTO): Promise<UserCreationOutputDTO> {
        const user = await User.createFromInput(userData);

        const dbUser = await prisma.user.create({
            data: {
                email: user.email,
                username: user.username,
                password: user.password,
            }
        }
        )

        console.log("Got through here!")
        return dbUser;
    }

    async listUsers(): Promise<UserReadDTO[]> {
        return await prisma.user.findMany();
    }

    async findUserById(id: number) {
        try {
            const dbUser = await prisma.user.findUniqueOrThrow({
                where: {
                    id: id
                },
            }
            )

            console.log("User Found: ", dbUser)

            return dbUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUserInfo(id: number, userData: userUpdateDTO): Promise<UserCreationOutputDTO> {
        try {
            await this.findUserById(id);

            const updatedUser = prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    username: userData.username,
                    email: userData.email,
                }
            }
            )

            return updatedUser;
        } catch (error) {
            console.log(error);

            throw error;
        }
    }

    async deleteUser(id: number): Promise<any> {
        try {
            await this.findUserById(id);

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