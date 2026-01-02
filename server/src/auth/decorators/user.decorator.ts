import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserPayload } from "../interfaces/user-payload.interface";
import { Request } from "express";

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as UserPayload;
  },
);
