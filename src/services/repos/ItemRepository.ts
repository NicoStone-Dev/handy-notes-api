import { TaskItem, TaskItemDTO } from "../../models/TaskItem";
import { TaskRepository } from "./TaskRepository";
import { prisma } from "../../prisma";

const taskRepo = new TaskRepository();

export class ItemRepository {

    async createSingle(description: string, taskId: number): Promise<TaskItemDTO> {
        const createdItem = await prisma.taskItem.create({
            data: {
                owningTaskId: taskId,
                completion: false,
                description: description,
            }
        });

        return createdItem;
    }

    async createMany(items: TaskItem[], taskId: number): Promise<TaskItemDTO[]> {
        const createdItems: TaskItemDTO[] = [];

        for (const item of items) {
            const createdItem = await this.createSingle(item.description, taskId);

            createdItems.push(createdItem);
        }

        return createdItems;
    }

    async listItemsForTask(taskCode: string): Promise<TaskItemDTO[]> {
        const task = await taskRepo.findTaskByTaskCode(taskCode);
        
        if (!task.items) {
            console.log("ITEMS_FOR_TASK_NOT_FOUND");
            throw new Error("ITEMS_FOR_TASK_NOT_FOUND");
        }

        const items = await prisma.taskItem.findMany({
            where: {
                owningTaskId: task.id,
            }
        });

        return items;
    }

    async findItemById(itemId: number): Promise<TaskItemDTO> {
        return await prisma.taskItem.findUniqueOrThrow({
            where: {
                id: itemId,
            }
        });
    }

    async updateItemDescription(itemId: number, newDescription: string): Promise<TaskItemDTO> {
        return prisma.taskItem.update({
            where: {
                id: itemId
            },
            data: {
                description: newDescription
            }
        });
    }

    // When called upon item just toggles it's completion state.
    async updateCompletion(itemId: number): Promise<TaskItemDTO> {
        const item = await this.findItemById(itemId);
        let toggle = false;

        if (!item.completion) {
            toggle = true
        }


        return await prisma.taskItem.update({
            where: {
                id: itemId
            },
            data: {
                completion: toggle
            }
        });
    }

    async deleteItem(itemId: number): Promise<TaskItemDTO> {
        const item = this.findItemById(itemId);

        return await prisma.taskItem.delete({
            where: {
             id: itemId   
            }
        });
    }

}