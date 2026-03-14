import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/Task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dtos/create-task.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
  ) {}

  async create({
    columnId,
    authorId,
    createTaskDto,
  }: {
    columnId: string;
    authorId: string;
    createTaskDto: CreateTaskDto;
  }): Promise<Task> {
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
}
