"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const task_schema_1 = require("./task.schema");
const categories_service_1 = require("../categories/categories.service");
const mongoose_2 = require("@nestjs/mongoose");
let TasksService = class TasksService {
    constructor(tasksModel, categoriesService) {
        this.tasksModel = tasksModel;
        this.categoriesService = categoriesService;
    }
    async findUserTasks(userId) {
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
    async findTaskById(taskId) {
        const task = await this.tasksModel.findById(taskId);
        if (!task) {
            throw new common_1.NotAcceptableException("task doesn't exist");
        }
        return task;
    }
    async createUserTask(userId, createTaskDto) {
        const task = await this.tasksModel.findOne({
            user: userId,
            title: createTaskDto.title,
        });
        if (task) {
            throw new common_1.NotAcceptableException('task with the same title already exists');
        }
        if (createTaskDto.category) {
            const category = await this.categoriesService.findUserCategoryByName(userId, createTaskDto.category);
            if (!category) {
                const newCategory = await this.categoriesService.createUserCategory(userId, { name: createTaskDto.category });
                createTaskDto.category = newCategory._id;
            }
            else {
                createTaskDto.category = category._id;
            }
        }
        const newTask = await this.tasksModel.create({
            ...createTaskDto,
            user: userId,
        });
        return newTask;
    }
    async updateTask(userId, taskId, updateTaskDto) {
        if (updateTaskDto.category) {
            const category = await this.categoriesService.findUserCategoryByName(userId, updateTaskDto.category);
            if (!category) {
                const newCategory = await this.categoriesService.createUserCategory(userId, { name: updateTaskDto.category });
                updateTaskDto.category = newCategory._id;
            }
            else {
                updateTaskDto.category = category._id;
            }
        }
        const task = await this.tasksModel.findByIdAndUpdate(taskId, updateTaskDto, { new: true });
        if (!task) {
            throw new common_1.NotAcceptableException("task doesn't exist");
        }
        return task;
    }
    async removeTask(taskId) {
        const task = await this.tasksModel.findByIdAndDelete(taskId);
        if (!task) {
            throw new common_1.NotAcceptableException("task doesn't exist");
        }
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        categories_service_1.CategoriesService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map