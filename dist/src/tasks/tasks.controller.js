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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const getCurrentUserId_decorator_1 = require("../common/decorators/getCurrentUserId.decorator");
const class_transformer_1 = require("class-transformer");
const response_task_dto_1 = require("./dto/response-task.dto");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async getUserTasks(id) {
        const tasks = await this.tasksService.findUserTasks(id);
        const usersTasks = (0, class_transformer_1.plainToInstance)(response_task_dto_1.ResponseTaskDto, tasks, {
            excludeExtraneousValues: true,
        });
        return { tasks: usersTasks };
    }
    async createUserTask(id, createTaskDto) {
        const task = await this.tasksService.createUserTask(id, createTaskDto);
        const responseTask = (0, class_transformer_1.plainToInstance)(response_task_dto_1.ResponseTaskDto, task.toObject(), {});
        return { task: responseTask };
    }
    async getTask(id) {
        const task = await this.tasksService.findTaskById(id);
        const responseTask = (0, class_transformer_1.plainToInstance)(response_task_dto_1.ResponseTaskDto, task.toObject());
        return { task: responseTask };
    }
    async updateTask(userId, taskId, updateTaskDto) {
        const task = await this.tasksService.updateTask(userId, taskId, updateTaskDto);
        const responseTask = (0, class_transformer_1.plainToInstance)(response_task_dto_1.ResponseTaskDto, task.toObject());
        return { task: responseTask };
    }
    async removeTask(id) {
        const task = await this.tasksService.removeTask(id);
        const responseTask = (0, class_transformer_1.plainToInstance)(response_task_dto_1.ResponseTaskDto, task.toObject());
        return { task: responseTask };
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, getCurrentUserId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getUserTasks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, getCurrentUserId_decorator_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createUserTask", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTask", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, getCurrentUserId_decorator_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "removeTask", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('users/me/tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map