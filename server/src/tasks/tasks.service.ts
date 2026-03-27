import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/Task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskOrderDto } from "./dtos/update-task-order.dto";
import { BoardColumn } from "src/columns/entities/Column.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
    @InjectRepository(BoardColumn)
    private readonly columnsRepository: Repository<BoardColumn>,
  ) {}

  async create({
    boardId,
    columnId,
    authorId,
    createTaskDto,
  }: {
    boardId: string;
    columnId: string;
    authorId: string;
    createTaskDto: CreateTaskDto;
  }): Promise<Task> {
    await this.ensureColumnExistsInBoardOrThrow(columnId, boardId);

    const columnsCount = await this.tasksRepository.count({
      where: { columnId },
    });

    const task = this.tasksRepository.create({
      authorId,
      columnId,
      order: columnsCount + 1,
      ...createTaskDto,
    });

    return this.tasksRepository.save(task);
  }

  getAll({ boardId }: { boardId: string }): Promise<Task[]> {
    return this.tasksRepository.find({ where: { column: { boardId } } });
  }

  async updateTaskOrder({
    boardId,
    taskId,
    updateTaskOrderDto,
  }: {
    boardId: string;
    taskId: string;
    updateTaskOrderDto: UpdateTaskOrderDto;
  }): Promise<void> {
    const foundTask = await this.findTaskInBoardOrThrow(taskId, boardId);
    await this.ensureColumnExistsInBoardOrThrow(
      updateTaskOrderDto.columnId,
      boardId,
    );

    foundTask.columnId = updateTaskOrderDto.columnId;
    foundTask.order = updateTaskOrderDto.order;

    await this.tasksRepository.save(foundTask);
  }

  private async ensureColumnExistsInBoardOrThrow(
    columnId: string,
    boardId: string,
  ): Promise<void> {
    const isColumnExists = await this.columnsRepository.exists({
      where: { id: columnId, boardId },
    });

    if (!isColumnExists) {
      throw new NotFoundException(`Column with ID ${columnId} not found`);
    }
  }

  private async findTaskInBoardOrThrow(
    taskId: string,
    boardId: string,
  ): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({
      where: { id: taskId, column: { boardId } },
    });

    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return foundTask;
  }
}
