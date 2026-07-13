import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Label } from "./entities/Label.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLabelDto } from "./dtos/create-label.dto";
import { UpdateLabelDto } from "./dtos/update-label.dto";

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelsRepository: Repository<Label>,
  ) {}

  createLabel({ boardId, dto }: { boardId: string; dto: CreateLabelDto }) {
    const label = this.labelsRepository.create({ boardId, ...dto });
    return this.labelsRepository.save(label);
  }

  getAll(boardId: string) {
    return this.labelsRepository.find({
      where: {
        boardId: boardId,
      },
    });
  }

  async update({
    boardId,
    labelId,
    dto,
  }: {
    boardId: string;
    labelId: string;
    dto: UpdateLabelDto;
  }) {
    const labelToUpdate = await this.labelsRepository.findOne({
      where: { boardId, id: labelId },
    });

    if (!labelToUpdate) throw new NotFoundException("Label not found");

    Object.assign(labelToUpdate, dto);

    await this.labelsRepository.save(labelToUpdate);

    return this.labelsRepository.find({ where: { boardId } });
  }

  async delete({ boardId, labelId }: { boardId: string; labelId: string }) {
    await this.labelsRepository.delete({ boardId, id: labelId });
    return this.labelsRepository.find({ where: { boardId } });
  }

  async getAssignedLabelsToTask({
    boardId,
    taskId,
  }: {
    boardId: string;
    taskId: string;
  }) {
    return this.labelsRepository
      .createQueryBuilder("label")
      .innerJoin("label.tasks", "task")
      .where("label.boardId = :boardId", { boardId })
      .andWhere("task.id = :taskId", { taskId })
      .getMany();
  }
}
