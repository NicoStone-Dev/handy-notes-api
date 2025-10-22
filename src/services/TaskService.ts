// import { User, UserCreationDTO } from '../models/User.js';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// export class TaskService {

//     async createTask(userData: UserCreationDTO): Promise<User> {
//         return await prisma.user.create({
//             data: {
//                 username: userData.username,
//                 password: bcrypt.hash(userData.password, 10)
//             }
//         }
//         )
//     }

//     async listTasks(): Promise<User[]> {
//         return await prisma.user.listAll();
//     }

//     async findTask(id: number): Promise<User[]> {
//         return await prisma.task.(id);
//     }

// }