import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { CategoriesService } from 'src/categories/categories.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private tasksModel: Model<Task>,
    private categoriesService: CategoriesService,
  ) {}

  // replace the category object id with the category name:
  async findUserTasks(userId: string) {
    return await this.tasksModel
      .find({ user: userId }, { user: false, __v: false })
      .populate('category', {
        __v: false,
        createdAt: false,
        updatedAt: false,
        user: false,
      })
      .lean();
  }

  async findTaskById(taskId: string) {
    const task = await this.tasksModel.findById(taskId);
    if (!task) {
      throw new NotAcceptableException("task doesn't exist");
    }
    return task;
  }

  async createUserTask(userId: string, createTaskDto: CreateTaskDto) {
    // validate if the task with the same title already exists:

    const task = await this.tasksModel.findOne({
      user: userId,
      title: createTaskDto.title,
    });

    if (task) {
      throw new NotAcceptableException(
        'task with the same title already exists',
      );
    }

    // Add category validation:
    if (createTaskDto.category) {
      const category = await this.categoriesService.findUserCategoryByName(
        userId,
        createTaskDto.category,
      );

      if (!category) {
        const newCategory = await this.categoriesService.createUserCategory(
          userId,
          { name: createTaskDto.category },
        );
        createTaskDto.category = newCategory._id;
      } else {
        createTaskDto.category = category._id;
      }
    }

    const newTask = await this.tasksModel.create({
      ...createTaskDto,
      user: userId,
    });
    return newTask;
  }

  async updateTask(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    if (updateTaskDto.category) {
      const category = await this.categoriesService.findUserCategoryByName(
        userId,
        updateTaskDto.category,
      );

      if (!category) {
        const newCategory = await this.categoriesService.createUserCategory(
          userId,
          { name: updateTaskDto.category },
        );
        updateTaskDto.category = newCategory._id;
      } else {
        updateTaskDto.category = category._id;
      }
    }

    const task = await this.tasksModel.findByIdAndUpdate(
      taskId,
      updateTaskDto,
      { new: true },
    );

    if (!task) {
      throw new NotAcceptableException("task doesn't exist");
    }
    return task;
  }

  async removeTask(taskId: string) {
    const task = await this.tasksModel.findByIdAndDelete(taskId);
    if (!task) {
      throw new NotAcceptableException("task doesn't exist");
    }
    return task;
  }
}
