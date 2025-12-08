import { UserReadDTO, UserCreationOutputDTO, userUpdateDTO } from '../models/User.js';
import { prisma } from '../prisma.js';

// Houses some CRUD operations only, related directly to the database.
export class UserRepository {

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

    async findUserByEmail(email: string) {
        try {
            const dbUser = await prisma.user.findUniqueOrThrow({
                where: {
                    email: email
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

    async findUserByUserHashCode(hash: string) {
        try {
            const dbUser = await prisma.user.findUniqueOrThrow({
                where: {
                    userCode: hash
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

    async deleteUser(id: number): Promise<UserCreationOutputDTO> {
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

    async existsById(id: number): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user !== null;
    }

    async existsByEmail(email: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return user !== null;
    }

    async existsByUsername(username: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        
        return user !== null;
    }
}