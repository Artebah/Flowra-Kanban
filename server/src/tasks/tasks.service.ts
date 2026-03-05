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

  create({
    columnId,
    authorId,
    createTaskDto,
  }: {
    columnId: string;
    authorId: string;
    createTaskDto: CreateTaskDto;
  }): Promise<Task> {
    const task = this.tasksRepository.create({
      authorId,
      columnId,
      order: 1,
      ...createTaskDto,
    });

    return this.tasksRepository.save(task);
  }
}
