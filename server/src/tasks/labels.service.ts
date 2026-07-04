import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Label } from "./entities/Label.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AddLabelsForTaskDto } from "./dtos/add-labels-for-task.dto";

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelsRepository: Repository<Label>,
  ) {}

  addLabelsForTask({ labels }: AddLabelsForTaskDto) {
    return this.labelsRepository.save(labels);
  }
}
