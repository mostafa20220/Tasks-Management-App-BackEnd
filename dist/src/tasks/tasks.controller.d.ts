import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseTaskDto } from './dto/response-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    getUserTasks(id: string): Promise<{
        tasks: ResponseTaskDto[];
    }>;
    createUserTask(id: string, createTaskDto: CreateTaskDto): Promise<{
        task: ResponseTaskDto;
    }>;
    getTask(id: string): Promise<{
        task: ResponseTaskDto;
    }>;
    updateTask(userId: string, taskId: string, updateTaskDto: UpdateTaskDto): Promise<{
        task: ResponseTaskDto;
    }>;
    removeTask(id: string): Promise<{
        task: ResponseTaskDto;
    }>;
}
