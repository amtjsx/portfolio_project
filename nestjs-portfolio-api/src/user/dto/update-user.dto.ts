import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsString } from "class-validator";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["password"] as const)
) {
  @IsString()
  password?: string;
}
