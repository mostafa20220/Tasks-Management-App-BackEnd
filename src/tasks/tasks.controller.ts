import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetCurrentUserId } from 'src/common/decorators/getCurrentUserId.decorator';
import { plainToInstance } from 'class-transformer';
import { ResponseTaskDto } from './dto/response-task.dto';

@Controller('users/me/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getUserTasks(
    @GetCurrentUserId() id: string,
  ): Promise<{ tasks: ResponseTaskDto[] }> {
    // : Promise<ResponseTaskDto[]>
    const tasks = await this.tasksService.findUserTasks(id);

    const usersTasks = plainToInstance(ResponseTaskDto, tasks, {
      // enableCircularCheck: true,
      // enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
    // return tasks;
    // return usersTasks;
    return { tasks: usersTasks };
    // return { tasks };
  }

  @Post()
  async createUserTask(
    @GetCurrentUserId() id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const task = await this.tasksService.createUserTask(id, createTaskDto);

    const responseTask = plainToInstance(ResponseTaskDto, task.toObject(), {});

    return { task: responseTask };
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    const task = await this.tasksService.findTaskById(id);

    const responseTask = plainToInstance(ResponseTaskDto, task.toObject());

    return { task: responseTask };
  }

  @Patch(':id')
  async updateTask(
    @GetCurrentUserId() userId: string,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.updateTask(
      userId,
      taskId,
      updateTaskDto,
    );

    const responseTask = plainToInstance(ResponseTaskDto, task.toObject());

    return { task: responseTask };
  }

  @Delete(':id')
  async removeTask(@Param('id') id: string) {
    const task = await this.tasksService.removeTask(id);

    const responseTask = plainToInstance(ResponseTaskDto, task.toObject());

    return { task: responseTask };
  }
}
