import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/Task.entity";
import { DataSource, In, Repository } from "typeorm";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskOrderDto } from "./dtos/update-task-order.dto";
import { BoardColumn } from "src/columns/entities/Column.entity";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { extractTextFromTiptap } from "src/common/utils/tiptap-parser.util";
import { CreateLabelDto } from "src/labels/dtos/create-label.dto";
import { Label } from "src/labels/entities/Label.entity";
import { AssignLabelsDto } from "./dtos/assign-labels.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
    @InjectRepository(BoardColumn)
    private readonly columnsRepository: Repository<BoardColumn>,
    @InjectRepository(Label)
    private readonly labelsRepository: Repository<Label>,
    private readonly dataSource: DataSource,
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
      isCompleted: false,
      ...createTaskDto,
    });

    return this.tasksRepository.save(task);
  }

  getAll({ boardId }: { boardId: string }): Promise<Task[]> {
    return this.tasksRepository.find({ where: { column: { boardId } } });
  }

  getOne({
    boardId,
    taskId,
  }: {
    boardId: string;
    taskId: string;
  }): Promise<Task | null> {
    return this.tasksRepository.findOne({
      where: { column: { boardId }, id: taskId },
      relations: {
        column: true,
      },
    });
  }

  async updateTask({
    taskId,
    updateTaskDto,
  }: {
    taskId: string;
    updateTaskDto: UpdateTaskDto;
  }): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ["column"],
    });
    if (!task) throw new NotFoundException("Task not found");

    const { descriptionContent, ...rest } = updateTaskDto;

    Object.assign(task, rest);

    if (descriptionContent !== undefined) {
      task.descriptionContent = descriptionContent;
      task.descriptionSearch = extractTextFromTiptap(descriptionContent);
    }

    return this.tasksRepository.save(task);
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

  createLabelAndAssignToTask({
    boardId,
    taskId,
    dto,
  }: {
    boardId: string;
    taskId: string;
    dto: CreateLabelDto;
  }) {
    return this.dataSource.transaction(async (manager) => {
      const task = await manager.findOne(Task, {
        where: { id: taskId },
        relations: ["labels"],
      });

      if (!task)
        throw new NotFoundException(`Task with ID ${taskId} not found`);

      const createdLabel = await manager.save(
        manager.create(Label, { boardId, ...dto }),
      );

      task.labels = [...task.labels, createdLabel];

      await manager.save(task);

      return manager.find(Label, {
        where: { boardId },
        order: { createdAt: "ASC" },
      });
    });
  }

  async assignLabels({
    dto,
    taskId,
  }: {
    dto: AssignLabelsDto;
    taskId: string;
  }) {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: { labels: true },
    });

    if (!task) throw new NotFoundException(`Task with ID ${taskId} not found`);

    task.labels = await this.labelsRepository.findBy({ id: In(dto.labelsIds) });

    return task.labels;
  }
}
