import { TaskCreationDTO, TaskReadDTO } from '../../models/Task.js';
import { prisma } from '../../prisma.js';
import { UserRepository } from './UserRepository.js';

const userRepo = new UserRepository();

// Mostly just CRUD utilities
export class TaskRepository {
    async listUserActiveTasks(ownerId: number): Promise<TaskReadDTO[]> {
        return prisma.task.findMany({
            where: {
                taskedUserId: ownerId,
                taskStatus: "IN_PROGRESS",
            }
        });
    }

    async listUserFailedTasks(ownerId: number): Promise<TaskReadDTO[]> {
        return prisma.task.findMany({
            where: {
                taskedUserId: ownerId,
                taskStatus: "FAILED"
            }
        });
    }

    async listUserOverdueTasks(ownerId: number): Promise<TaskReadDTO[]> {
        return prisma.task.findMany({
            where: {
                taskedUserId: ownerId,
                taskStatus: "OVERDUE"
            }
        });
    }

    async findTaskByTaskId(taskCode: string): Promise<TaskReadDTO> {
        try {
            const task = await prisma.task.findUniqueOrThrow({
                where: {
                    taskCode: taskCode,
                },
                select: {
                    id: true,
                    taskCode: true,
                    createdAt: true,
                    title: true,
                    taskStatus: true
                }
            });

            return task;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    async findTaskByTaskCode(taskCode: string): Promise<TaskReadDTO> {
        try {
            const task = await prisma.task.findUniqueOrThrow({
                where: {
                    taskCode: taskCode,
                },
                select: {
                    id: true,
                    taskCode: true,
                    createdAt: true,
                    title: true,
                    taskStatus: true
                }
            });

            return task;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async createTask(ownerId: number, task: TaskCreationDTO): Promise<TaskReadDTO> {
        const createdTask = await prisma.task.create({
            data: {
                taskedUserId: ownerId,
                title: task.title,
            }
        });

        return createdTask;
    }

    async updateTaskTitle(title: string, taskCode: string): Promise<TaskReadDTO> {
        return await prisma.task.update({
            where: {
                taskCode: taskCode
            },
            data: {
                title: title
            }
        })
    }

    async deleteTask(taskCode: string) {
        return await prisma.task.delete({
            where: {
                taskCode: taskCode,
            }
        });
    }
}
