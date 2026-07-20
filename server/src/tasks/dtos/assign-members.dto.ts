import { IsArray, IsString } from "class-validator";

export class AssignMembersDto {
  @IsArray()
  @IsString({ each: true })
  membersIds: string[];
}
