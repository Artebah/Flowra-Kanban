import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Label } from "./entities/Label.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLabelDto } from "./dtos/create-label.dto";

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelsRepository: Repository<Label>,
  ) {}

  createLabel({ boardId, dto }: { boardId: string; dto: CreateLabelDto }) {
    const createdLabel = this.labelsRepository.create({
      boardId,
      ...dto,
    });

    return this.labelsRepository.save(createdLabel);
  }
}
